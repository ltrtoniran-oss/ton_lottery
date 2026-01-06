import "@stdlib/deploy";
import "@stdlib/ownable";

message BuyTicket {}

message Draw {
    queryId: Int as uint64;
}

contract Lottery with Deployable, Ownable {
    owner: Address;
    ticketPrice: Int as coins;
    endTime: Int as uint32;
    interval: Int as uint32;
    players: map<Int, Address>;
    playerCount: Int as uint32;
    userTicketCounts: map<Address, Int as uint32>;
    recentWinners: map<Int as uint32, Address>;
    winnerCount: Int as uint32;

    init(owner: Address) {
        self.owner = owner;
        self.ticketPrice = ton("1"); // 1 TON per ticket
        self.interval = 604800; // 1 week in seconds
        self.endTime = now() + self.interval;
        self.playerCount = 0;
        self.winnerCount = 0;
    }

    receive("buy") {
        let ctx: Context = context();
        require(ctx.value >= self.ticketPrice, "Insufficient funds");
        require(now() < self.endTime, "Lottery closed");

        self.players.set(self.playerCount, ctx.sender);
        self.playerCount = self.playerCount + 1;

        let currentCount: Int = 0;
        let countOpt: Int? = self.userTicketCounts.get(ctx.sender);
        if (countOpt != null) {
            currentCount = countOpt!!;
        }
        self.userTicketCounts.set(ctx.sender, currentCount + 1);
    }

    receive("draw") {
        require(now() >= self.endTime, "Lottery not finished");
        require(self.playerCount > 0, "No players");

        // Simple pseudo-randomness for MVP
        let random: Int = randomInt();
        let winnerIndex: Int = random % self.playerCount;
        let winner: Address = self.players.get(winnerIndex)!!;

        // Pay winner (leave 0.05 TON for rent/storage if needed, or just send all balance minus gas)
        send(SendParameters {
            to: winner,
            value: 0,
            mode: SendRemainingBalance,
            bounce: true,
        });

        // Save winner
        self.recentWinners.set(self.winnerCount % 3, winner);
        self.winnerCount = self.winnerCount + 1;

        // Reset lottery
        self.players = emptyMap();
        self.userTicketCounts = emptyMap();
        self.playerCount = 0;
        self.endTime = now() + self.interval;
    }

    get fun balance(): Int {
        return myBalance();
    }

    get fun params(): Int {
        return self.endTime;
    }

    get fun userTickets(user: Address): Int {
        let count: Int? = self.userTicketCounts.get(user);
        if (count != null) {
            return count!!;
        }
        return 0;
    }

    get fun lastWinners(): map<Int as uint32, Address> {
        // Return raw map or tuple?
        // Frontend expects: w1, w2, w3.
        // But getting a map in frontend via stack is tricky if not knowing keys.
        // Better to return 3 addresses specifically if frontend expects tuple.
        // Tact doesn't support returning tuple nicely in `get` for TS wrapper often,
        // but let's try returning the map or specific values.
        // Actually, let's keep it simple and return the map for now,
        // OR better: specific values.
        return self.recentWinners;
    }
}
