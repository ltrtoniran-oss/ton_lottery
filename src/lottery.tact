import "@stdlib/deploy";

message BuyTicket {}

message Draw {
    queryId: Int as uint64;
}

contract Lottery with Deployable {
    owner: Address;
    ticketPrice: Int as coins;
    startTime: Int as uint32;
    endTime: Int as uint32;
    interval: Int as uint32;
    // Map: Address -> Int (count) ? No, just list or simple count.
    // MVP: Random selection from hash. We don't need full list if we trust hash of logical time?
    // Actually, to pick a winner we need a way to map random number to a user.
    // Previous MVP implementation assumed simple logic or external indexer.
    // Let's stick to the previous simple logic but refine it.
    // If we want to pick a REAL winner, we need to store them.
    // Map<Int, Address> ?
    consumers: map<Int, Address>;
    ticketCounts: map<Address, Int>; // Track tickets per user
    counter: Int as uint32;
    lastWinner1: Address? = null;
    lastWinner2: Address? = null;
    lastWinner3: Address? = null;

    init(owner: Address) {
        self.owner = owner;
        self.ticketPrice = ton("1");
        self.startTime = now();
        self.interval = 60 * 60 * 24 * 7; // 1 week
        self.endTime = self.startTime + self.interval;
        self.counter = 0;
    }

    receive("buy") {
        let ctx: Context = context();
        require(ctx.value >= self.ticketPrice, "Not enough TON");
        require(now() < self.endTime, "Lottery closed");

        self.consumers.set(self.counter, ctx.sender);
        self.counter = self.counter + 1;

        // Update ticket count for user
        let currentCount: Int = 0;
        let savedCount: Int? = self.ticketCounts.get(ctx.sender);
        if (savedCount != null) {
            currentCount = savedCount!!;
        }
        self.ticketCounts.set(ctx.sender, currentCount + 1);
    }

    receive("draw") {
        require(now() >= self.endTime, "Not yet");
        self.executeDraw();
    }

    fun executeDraw() {
        if (self.counter == 0) {
            self.reset();
            return;
        }

        // Winner 1
        let seed1: Int = random(0, self.counter);
        let winner1: Address = self.consumers.get(seed1)!!;
        self.lastWinner1 = winner1;

        // Winner 2
        let seed2: Int = random(0, self.counter);
        let winner2: Address = self.consumers.get(seed2)!!;
        let attempts: Int = 0;
        // Try to find a unique winner (max 5 retries to save gas)
        while (winner2 == winner1 && attempts < 5 && self.counter > 1) {
            seed2 = random(0, self.counter);
            winner2 = self.consumers.get(seed2)!!;
            attempts = attempts + 1;
        }
        self.lastWinner2 = winner2;

        // Winner 3
        let seed3: Int = random(0, self.counter);
        let winner3: Address = self.consumers.get(seed3)!!;
        attempts = 0;
        while ((winner3 == winner1 || winner3 == winner2) && attempts < 5 && self.counter > 2) {
            seed3 = random(0, self.counter);
            winner3 = self.consumers.get(seed3)!!;
            attempts = attempts + 1;
        }
        self.lastWinner3 = winner3;

        let balance: Int = myBalance();
        let storageReserve: Int = ton("0.05");
        let pot: Int = balance - storageReserve;

        if (pot > 0) {
            let prize1: Int = pot * 50 / 100;
            let prize2: Int = pot * 25 / 100;
            let prize3: Int = pot * 15 / 100;

            // Pay Winner 1
            send(SendParameters {
                to: winner1,
                value: prize1,
                mode: SendIgnoreErrors,
                body: "First Place Winner!".asComment(),
            });

            // Pay Winner 2
            send(SendParameters {
                to: winner2,
                value: prize2,
                mode: SendIgnoreErrors,
                body: "Second Place Winner!".asComment(),
            });

            // Pay Winner 3
            send(SendParameters {
                to: winner3,
                value: prize3,
                mode: SendIgnoreErrors,
                body: "Third Place Winner!".asComment(),
            });
        }

        self.reset();
    }

    fun reset() {
        self.startTime = now();
        self.endTime = self.startTime + self.interval;
        self.counter = 0;
        self.consumers = emptyMap();
        self.ticketCounts = emptyMap(); // Clear ticket counts

        // NOTE: We do NOT clear lastWinners here, so they persist until next draw

        // Check for accumulated fees
        let balance: Int = myBalance() - ton("0.05"); // reserve
        if (balance > ton("10")) {
            send(SendParameters {
                to: self.owner,
                value: balance,
                mode: SendIgnoreErrors,
                body: "Fee Payout".asComment(),
            });
        }
    }

    get fun balance(): Int {
        return myBalance();
    }

    get fun params(): Int {
        return self.endTime;
    }

    get fun userTickets(user: Address): Int {
        let count: Int? = self.ticketCounts.get(user);
        if (count == null) {
            return 0;
        }
        return count!!;
    }

    // Return addresses of last 3 winners (or null if none)
    // Tact can't easy return complex array of optionals in a simple way for frontend sometimes,
    // but returning specific fields is safest.
    get fun lastWinners(): LastWinners {
        return LastWinners {
            winner1: self.lastWinner1,
            winner2: self.lastWinner2,
            winner3: self.lastWinner3,
        };
    }
}

struct LastWinners {
    winner1: Address?;
    winner2: Address?;
    winner3: Address?;
}
