import {
    Cell,
    Slice,
    Address,
    Builder,
    beginCell,
    ComputeError,
    TupleItem,
    TupleReader,
    Dictionary,
    contractAddress,
    address,
    ContractProvider,
    Sender,
    Contract,
    ContractABI,
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type DataSize = {
    $$type: 'DataSize';
    cells: bigint;
    bits: bigint;
    refs: bigint;
}

export function storeDataSize(src: DataSize) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.cells, 257);
        b_0.storeInt(src.bits, 257);
        b_0.storeInt(src.refs, 257);
    };
}

export function loadDataSize(slice: Slice) {
    const sc_0 = slice;
    const _cells = sc_0.loadIntBig(257);
    const _bits = sc_0.loadIntBig(257);
    const _refs = sc_0.loadIntBig(257);
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

export function loadTupleDataSize(source: TupleReader) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

export function loadGetterTupleDataSize(source: TupleReader) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

export function storeTupleDataSize(source: DataSize) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.cells);
    builder.writeNumber(source.bits);
    builder.writeNumber(source.refs);
    return builder.build();
}

export function dictValueParserDataSize(): DictionaryValue<DataSize> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDataSize(src)).endCell());
        },
        parse: (src) => {
            return loadDataSize(src.loadRef().beginParse());
        }
    }
}

export type SignedBundle = {
    $$type: 'SignedBundle';
    signature: Buffer;
    signedData: Slice;
}

export function storeSignedBundle(src: SignedBundle) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeBuffer(src.signature);
        b_0.storeBuilder(src.signedData.asBuilder());
    };
}

export function loadSignedBundle(slice: Slice) {
    const sc_0 = slice;
    const _signature = sc_0.loadBuffer(64);
    const _signedData = sc_0;
    return { $$type: 'SignedBundle' as const, signature: _signature, signedData: _signedData };
}

export function loadTupleSignedBundle(source: TupleReader) {
    const _signature = source.readBuffer();
    const _signedData = source.readCell().asSlice();
    return { $$type: 'SignedBundle' as const, signature: _signature, signedData: _signedData };
}

export function loadGetterTupleSignedBundle(source: TupleReader) {
    const _signature = source.readBuffer();
    const _signedData = source.readCell().asSlice();
    return { $$type: 'SignedBundle' as const, signature: _signature, signedData: _signedData };
}

export function storeTupleSignedBundle(source: SignedBundle) {
    const builder = new TupleBuilder();
    builder.writeBuffer(source.signature);
    builder.writeSlice(source.signedData.asCell());
    return builder.build();
}

export function dictValueParserSignedBundle(): DictionaryValue<SignedBundle> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSignedBundle(src)).endCell());
        },
        parse: (src) => {
            return loadSignedBundle(src.loadRef().beginParse());
        }
    }
}

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    const sc_0 = slice;
    const _code = sc_0.loadRef();
    const _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

export function loadTupleStateInit(source: TupleReader) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

export function loadGetterTupleStateInit(source: TupleReader) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

export function storeTupleStateInit(source: StateInit) {
    const builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

export function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounceable: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeBit(src.bounceable);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}

export function loadContext(slice: Slice) {
    const sc_0 = slice;
    const _bounceable = sc_0.loadBit();
    const _sender = sc_0.loadAddress();
    const _value = sc_0.loadIntBig(257);
    const _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

export function loadTupleContext(source: TupleReader) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

export function loadGetterTupleContext(source: TupleReader) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

export function storeTupleContext(source: Context) {
    const builder = new TupleBuilder();
    builder.writeBoolean(source.bounceable);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
    return builder.build();
}

export function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeAddress(src.to);
        b_0.storeBit(src.bounce);
    };
}

export function loadSendParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _to = sc_0.loadAddress();
    const _bounce = sc_0.loadBit();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

export function loadTupleSendParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

export function loadGetterTupleSendParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

export function storeTupleSendParameters(source: SendParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    builder.writeNumber(source.value);
    builder.writeAddress(source.to);
    builder.writeBoolean(source.bounce);
    return builder.build();
}

export function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type MessageParameters = {
    $$type: 'MessageParameters';
    mode: bigint;
    body: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
}

export function storeMessageParameters(src: MessageParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeAddress(src.to);
        b_0.storeBit(src.bounce);
    };
}

export function loadMessageParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _to = sc_0.loadAddress();
    const _bounce = sc_0.loadBit();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

export function loadTupleMessageParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

export function loadGetterTupleMessageParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

export function storeTupleMessageParameters(source: MessageParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeNumber(source.value);
    builder.writeAddress(source.to);
    builder.writeBoolean(source.bounce);
    return builder.build();
}

export function dictValueParserMessageParameters(): DictionaryValue<MessageParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMessageParameters(src)).endCell());
        },
        parse: (src) => {
            return loadMessageParameters(src.loadRef().beginParse());
        }
    }
}

export type DeployParameters = {
    $$type: 'DeployParameters';
    mode: bigint;
    body: Cell | null;
    value: bigint;
    bounce: boolean;
    init: StateInit;
}

export function storeDeployParameters(src: DeployParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeBit(src.bounce);
        b_0.store(storeStateInit(src.init));
    };
}

export function loadDeployParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _bounce = sc_0.loadBit();
    const _init = loadStateInit(sc_0);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

export function loadTupleDeployParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadTupleStateInit(source);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

export function loadGetterTupleDeployParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadGetterTupleStateInit(source);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

export function storeTupleDeployParameters(source: DeployParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeNumber(source.value);
    builder.writeBoolean(source.bounce);
    builder.writeTuple(storeTupleStateInit(source.init));
    return builder.build();
}

export function dictValueParserDeployParameters(): DictionaryValue<DeployParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployParameters(src)).endCell());
        },
        parse: (src) => {
            return loadDeployParameters(src.loadRef().beginParse());
        }
    }
}

export type StdAddress = {
    $$type: 'StdAddress';
    workchain: bigint;
    address: bigint;
}

export function storeStdAddress(src: StdAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.workchain, 8);
        b_0.storeUint(src.address, 256);
    };
}

export function loadStdAddress(slice: Slice) {
    const sc_0 = slice;
    const _workchain = sc_0.loadIntBig(8);
    const _address = sc_0.loadUintBig(256);
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

export function loadTupleStdAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

export function loadGetterTupleStdAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

export function storeTupleStdAddress(source: StdAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeNumber(source.address);
    return builder.build();
}

export function dictValueParserStdAddress(): DictionaryValue<StdAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStdAddress(src)).endCell());
        },
        parse: (src) => {
            return loadStdAddress(src.loadRef().beginParse());
        }
    }
}

export type VarAddress = {
    $$type: 'VarAddress';
    workchain: bigint;
    address: Slice;
}

export function storeVarAddress(src: VarAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.workchain, 32);
        b_0.storeRef(src.address.asCell());
    };
}

export function loadVarAddress(slice: Slice) {
    const sc_0 = slice;
    const _workchain = sc_0.loadIntBig(32);
    const _address = sc_0.loadRef().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

export function loadTupleVarAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

export function loadGetterTupleVarAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

export function storeTupleVarAddress(source: VarAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeSlice(source.address.asCell());
    return builder.build();
}

export function dictValueParserVarAddress(): DictionaryValue<VarAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVarAddress(src)).endCell());
        },
        parse: (src) => {
            return loadVarAddress(src.loadRef().beginParse());
        }
    }
}

export type BasechainAddress = {
    $$type: 'BasechainAddress';
    hash: bigint | null;
}

export function storeBasechainAddress(src: BasechainAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        if (src.hash !== null && src.hash !== undefined) { b_0.storeBit(true).storeInt(src.hash, 257); } else { b_0.storeBit(false); }
    };
}

export function loadBasechainAddress(slice: Slice) {
    const sc_0 = slice;
    const _hash = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

export function loadTupleBasechainAddress(source: TupleReader) {
    const _hash = source.readBigNumberOpt();
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

export function loadGetterTupleBasechainAddress(source: TupleReader) {
    const _hash = source.readBigNumberOpt();
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

export function storeTupleBasechainAddress(source: BasechainAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.hash);
    return builder.build();
}

export function dictValueParserBasechainAddress(): DictionaryValue<BasechainAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBasechainAddress(src)).endCell());
        },
        parse: (src) => {
            return loadBasechainAddress(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

export function loadTupleDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

export function loadGetterTupleDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

export function storeTupleDeploy(source: Deploy) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

export function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

export function loadTupleDeployOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

export function loadGetterTupleDeployOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

export function storeTupleDeployOk(source: DeployOk) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

export function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

export function loadTupleFactoryDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

export function loadGetterTupleFactoryDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

export function storeTupleFactoryDeploy(source: FactoryDeploy) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

export function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type BuyTicket = {
    $$type: 'BuyTicket';
}

export function storeBuyTicket(src: BuyTicket) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3031985754, 32);
    };
}

export function loadBuyTicket(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3031985754) { throw Error('Invalid prefix'); }
    return { $$type: 'BuyTicket' as const };
}

export function loadTupleBuyTicket(source: TupleReader) {
    return { $$type: 'BuyTicket' as const };
}

export function loadGetterTupleBuyTicket(source: TupleReader) {
    return { $$type: 'BuyTicket' as const };
}

export function storeTupleBuyTicket(source: BuyTicket) {
    const builder = new TupleBuilder();
    return builder.build();
}

export function dictValueParserBuyTicket(): DictionaryValue<BuyTicket> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBuyTicket(src)).endCell());
        },
        parse: (src) => {
            return loadBuyTicket(src.loadRef().beginParse());
        }
    }
}

export type Draw = {
    $$type: 'Draw';
    queryId: bigint;
}

export function storeDraw(src: Draw) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(25682509, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDraw(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 25682509) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Draw' as const, queryId: _queryId };
}

export function loadTupleDraw(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'Draw' as const, queryId: _queryId };
}

export function loadGetterTupleDraw(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'Draw' as const, queryId: _queryId };
}

export function storeTupleDraw(source: Draw) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

export function dictValueParserDraw(): DictionaryValue<Draw> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDraw(src)).endCell());
        },
        parse: (src) => {
            return loadDraw(src.loadRef().beginParse());
        }
    }
}

export type Lottery$Data = {
    $$type: 'Lottery$Data';
    owner: Address;
    ticketPrice: bigint;
    startTime: bigint;
    endTime: bigint;
    interval: bigint;
    consumers: Dictionary<bigint, Address>;
    ticketCounts: Dictionary<Address, bigint>;
    counter: bigint;
    lastWinner1: Address | null;
    lastWinner2: Address | null;
    lastWinner3: Address | null;
}

export function storeLottery$Data(src: Lottery$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeCoins(src.ticketPrice);
        b_0.storeUint(src.startTime, 32);
        b_0.storeUint(src.endTime, 32);
        b_0.storeUint(src.interval, 32);
        b_0.storeDict(src.consumers, Dictionary.Keys.BigInt(257), Dictionary.Values.Address());
        b_0.storeDict(src.ticketCounts, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257));
        b_0.storeUint(src.counter, 32);
        b_0.storeAddress(src.lastWinner1);
        const b_1 = new Builder();
        b_1.storeAddress(src.lastWinner2);
        b_1.storeAddress(src.lastWinner3);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLottery$Data(slice: Slice) {
    const sc_0 = slice;
    const _owner = sc_0.loadAddress();
    const _ticketPrice = sc_0.loadCoins();
    const _startTime = sc_0.loadUintBig(32);
    const _endTime = sc_0.loadUintBig(32);
    const _interval = sc_0.loadUintBig(32);
    const _consumers = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), sc_0);
    const _ticketCounts = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), sc_0);
    const _counter = sc_0.loadUintBig(32);
    const _lastWinner1 = sc_0.loadMaybeAddress();
    const sc_1 = sc_0.loadRef().beginParse();
    const _lastWinner2 = sc_1.loadMaybeAddress();
    const _lastWinner3 = sc_1.loadMaybeAddress();
    return { $$type: 'Lottery$Data' as const, owner: _owner, ticketPrice: _ticketPrice, startTime: _startTime, endTime: _endTime, interval: _interval, consumers: _consumers, ticketCounts: _ticketCounts, counter: _counter, lastWinner1: _lastWinner1, lastWinner2: _lastWinner2, lastWinner3: _lastWinner3 };
}

export function loadTupleLottery$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _ticketPrice = source.readBigNumber();
    const _startTime = source.readBigNumber();
    const _endTime = source.readBigNumber();
    const _interval = source.readBigNumber();
    const _consumers = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), source.readCellOpt());
    const _ticketCounts = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), source.readCellOpt());
    const _counter = source.readBigNumber();
    const _lastWinner1 = source.readAddressOpt();
    const _lastWinner2 = source.readAddressOpt();
    const _lastWinner3 = source.readAddressOpt();
    return { $$type: 'Lottery$Data' as const, owner: _owner, ticketPrice: _ticketPrice, startTime: _startTime, endTime: _endTime, interval: _interval, consumers: _consumers, ticketCounts: _ticketCounts, counter: _counter, lastWinner1: _lastWinner1, lastWinner2: _lastWinner2, lastWinner3: _lastWinner3 };
}

export function loadGetterTupleLottery$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _ticketPrice = source.readBigNumber();
    const _startTime = source.readBigNumber();
    const _endTime = source.readBigNumber();
    const _interval = source.readBigNumber();
    const _consumers = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), source.readCellOpt());
    const _ticketCounts = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), source.readCellOpt());
    const _counter = source.readBigNumber();
    const _lastWinner1 = source.readAddressOpt();
    const _lastWinner2 = source.readAddressOpt();
    const _lastWinner3 = source.readAddressOpt();
    return { $$type: 'Lottery$Data' as const, owner: _owner, ticketPrice: _ticketPrice, startTime: _startTime, endTime: _endTime, interval: _interval, consumers: _consumers, ticketCounts: _ticketCounts, counter: _counter, lastWinner1: _lastWinner1, lastWinner2: _lastWinner2, lastWinner3: _lastWinner3 };
}

export function storeTupleLottery$Data(source: Lottery$Data) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeNumber(source.ticketPrice);
    builder.writeNumber(source.startTime);
    builder.writeNumber(source.endTime);
    builder.writeNumber(source.interval);
    builder.writeCell(source.consumers.size > 0 ? beginCell().storeDictDirect(source.consumers, Dictionary.Keys.BigInt(257), Dictionary.Values.Address()).endCell() : null);
    builder.writeCell(source.ticketCounts.size > 0 ? beginCell().storeDictDirect(source.ticketCounts, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeNumber(source.counter);
    builder.writeAddress(source.lastWinner1);
    builder.writeAddress(source.lastWinner2);
    builder.writeAddress(source.lastWinner3);
    return builder.build();
}

export function dictValueParserLottery$Data(): DictionaryValue<Lottery$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLottery$Data(src)).endCell());
        },
        parse: (src) => {
            return loadLottery$Data(src.loadRef().beginParse());
        }
    }
}

export type LastWinners = {
    $$type: 'LastWinners';
    winner1: Address | null;
    winner2: Address | null;
    winner3: Address | null;
}

export function storeLastWinners(src: LastWinners) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.winner1);
        b_0.storeAddress(src.winner2);
        b_0.storeAddress(src.winner3);
    };
}

export function loadLastWinners(slice: Slice) {
    const sc_0 = slice;
    const _winner1 = sc_0.loadMaybeAddress();
    const _winner2 = sc_0.loadMaybeAddress();
    const _winner3 = sc_0.loadMaybeAddress();
    return { $$type: 'LastWinners' as const, winner1: _winner1, winner2: _winner2, winner3: _winner3 };
}

export function loadTupleLastWinners(source: TupleReader) {
    const _winner1 = source.readAddressOpt();
    const _winner2 = source.readAddressOpt();
    const _winner3 = source.readAddressOpt();
    return { $$type: 'LastWinners' as const, winner1: _winner1, winner2: _winner2, winner3: _winner3 };
}

export function loadGetterTupleLastWinners(source: TupleReader) {
    const _winner1 = source.readAddressOpt();
    const _winner2 = source.readAddressOpt();
    const _winner3 = source.readAddressOpt();
    return { $$type: 'LastWinners' as const, winner1: _winner1, winner2: _winner2, winner3: _winner3 };
}

export function storeTupleLastWinners(source: LastWinners) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.winner1);
    builder.writeAddress(source.winner2);
    builder.writeAddress(source.winner3);
    return builder.build();
}

export function dictValueParserLastWinners(): DictionaryValue<LastWinners> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLastWinners(src)).endCell());
        },
        parse: (src) => {
            return loadLastWinners(src.loadRef().beginParse());
        }
    }
}

 type Lottery_init_args = {
    $$type: 'Lottery_init_args';
    owner: Address;
}

function initLottery_init_args(src: Lottery_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
    };
}

async function Lottery_init(owner: Address) {
    const __code = Cell.fromHex('b5ee9c7241021f010007c7000262ff008e88f4a413f4bcf2c80bed53208e9c30eda2edfb01d072d721d200d200fa4021103450666f04f86102f862e1ed43d9010c020378e0020a020166030501efaf6076a268690000c7217d207d00698fe98fe98ffa026a00e87a02698feb9600c8b6c9fd2000f100eb9600c8b6c9fd2000f100eb9600c8b6c9fd2000f118882d882d082c882c082b882b360dc7127d200080e8b6b6b6b6b6c1081dcd65007c11c104049d402e50081c23ab081a0811b82811f16d9e3658c0040008f8276f10020148060801eda697da89a1a400031c85f481f401a63fa63fa63fe809a803a1e809a63fae580322db27f48003c403ae580322db27f48003c403ae580322db27f48003c46220b620b420b220b020ae20acd8371c49f4800203a2dadadadadb042077359401f0470410127500b94020708eac20682046e0a047c5b678d96707000654721001f1a417da89a1a400031c85f481f401a63fa63fa63fe809a803a1e809a63fae580322db27f48003c403ae580322db27f48003c403ae580322db27f48003c46220b620b420b220b020ae20acd8371c49f4800203a2dadadadadb042077359401f0470410127500b94020708eac20682046e0a047c4aa15b678d96309004481010b26028101014133f40a6fa19401d70030925b6de2206e923070e0206ef2d08001efb86d5ed44d0d200018e42fa40fa00d31fd31fd31ff404d401d0f404d31fd72c01916d93fa4001e201d72c01916d93fa4001e201d72c01916d93fa4001e231105b105a10591058105710566c1b8e24fa400101d16d6d6d6d6d82103b9aca00f8238208093a805ca01038475610341023705023e2db3c6cb180b00022702fced44d0d200018e42fa40fa00d31fd31fd31ff404d401d0f404d31fd72c01916d93fa4001e201d72c01916d93fa4001e201d72c01916d93fa4001e231105b105a10591058105710566c1b8e24fa400101d16d6d6d6d6d82103b9aca00f8238208093a805ca01038475610341023705023e20c925f0ce02ad749c21fe3000a0d0f01a60ad31f018210946a98b6ba8ec4d33f30c8018210aff90f5758cb1fcb3fc9109b108a107910681057104610354430f84270705003804201503304c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00e00a0e0094c87f01ca0055a050abce5008fa0216cb1f14cb1f12cb1ff40001c8f40012cb1f58206e9430cf84809201cee258206e9430cf84809201cee258206e9430cf84809201cee2cdc9ed54db3102a4f9012082f091a3be4c93a85bd2e6be4eb82f98c33c12384ddd3ea141580587f8d8e38b1e0dbae30282f0b06e2f6ff1a217a458de5285280d11f15c0e47d065a96713ffb52bce4d197514bae3025f0bf2c082101201f830f8416f2430813bc8332abe12f2f4814b57f82328b9f2f4048101015335206e953059f45a30944133f414e202a4702481010b278101014133f40a6fa19401d70030925b6de2206eb39631206ef2d0809130e281010b01a410354160810101216e955b59f4593098c801cf004133f441e2108a107910681057045056110090c87f01ca0055a050abce5008fa0216cb1f14cb1f12cb1ff40001c8f40012cb1f58206e9430cf84809201cee258206e9430cf84809201cee258206e9430cf84809201cee2cdc9ed5401b082008fedf82327bef2f4108a5517db3cc87f01ca0055a050abce5008fa0216cb1f14cb1f12cb1ff40001c8f40012cb1f58206e9430cf84809201cee258206e9430cf84809201cee258206e9430cf84809201cee2cdc9ed541303e0238e82db3ce15f037021f8446e97f825f8157ff864de21a1f811a0810101240259f40c6fa192306ddf206ef2d080207023f8446e97f825f8157ff864de21a1f811a0810101260259f40c6fa192306ddf206ef2d080708e125313c7059320c1059170e29324c2019170e28ae8302070251d14150052317024f8446e97f825f8157ff864de21a1f811a0810101270259f40c6fa192306ddf206ef2d08001a401f8f8446e97f825f8157ff864de21a1f811a0810101280259f40c6fa192306ddf206ef2d080708e1a5315c705917f945313c705e29320c1059170e29326c2029170e28e29317026f8446e97f825f8157ff864de21a1f811a0810101290259f40c6fa192306ddf206ef2d08001a4e83020f8276f10820afaf080a120c200160216953010256c31e30d12db3c171d04fe20a7328064a90421a7198064a90402a70f8064a9047288103a102a5a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00728810365a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf818ae2f400c901fb007218191a1b002e00000000466972737420506c6163652057696e6e6572210030000000005365636f6e6420506c6163652057696e6e657221001a58cf8680cf8480f400f400cf81017688102310265a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb001c002e00000000546869726420506c6163652057696e6e65722101ce6c333434f8235302a0706d6df8276f10820afaf080a1208212540be400bc8ebb72882d55205a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb009130e21048103750444515031e001c00000000466565205061796f75740b98c3a0');
    const builder = beginCell();
    builder.storeUint(0, 1);
    initLottery_init_args({ $$type: 'Lottery_init_args', owner })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

export const Lottery_errors = {
    2: { message: "Stack underflow" },
    3: { message: "Stack overflow" },
    4: { message: "Integer overflow" },
    5: { message: "Integer out of expected range" },
    6: { message: "Invalid opcode" },
    7: { message: "Type check error" },
    8: { message: "Cell overflow" },
    9: { message: "Cell underflow" },
    10: { message: "Dictionary error" },
    11: { message: "'Unknown' error" },
    12: { message: "Fatal error" },
    13: { message: "Out of gas error" },
    14: { message: "Virtualization error" },
    32: { message: "Action list is invalid" },
    33: { message: "Action list is too long" },
    34: { message: "Action is invalid or not supported" },
    35: { message: "Invalid source address in outbound message" },
    36: { message: "Invalid destination address in outbound message" },
    37: { message: "Not enough Toncoin" },
    38: { message: "Not enough extra currencies" },
    39: { message: "Outbound message does not fit into a cell after rewriting" },
    40: { message: "Cannot process a message" },
    41: { message: "Library reference is null" },
    42: { message: "Library change action error" },
    43: { message: "Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree" },
    50: { message: "Account state size exceeded limits" },
    128: { message: "Null reference exception" },
    129: { message: "Invalid serialization prefix" },
    130: { message: "Invalid incoming message" },
    131: { message: "Constraints error" },
    132: { message: "Access denied" },
    133: { message: "Contract stopped" },
    134: { message: "Invalid argument" },
    135: { message: "Code of a contract was not found" },
    136: { message: "Invalid standard address" },
    138: { message: "Not a basechain address" },
    15304: { message: "Not enough TON" },
    19287: { message: "Lottery closed" },
    36845: { message: "Not yet" },
} as const

export const Lottery_errors_backward = {
    "Stack underflow": 2,
    "Stack overflow": 3,
    "Integer overflow": 4,
    "Integer out of expected range": 5,
    "Invalid opcode": 6,
    "Type check error": 7,
    "Cell overflow": 8,
    "Cell underflow": 9,
    "Dictionary error": 10,
    "'Unknown' error": 11,
    "Fatal error": 12,
    "Out of gas error": 13,
    "Virtualization error": 14,
    "Action list is invalid": 32,
    "Action list is too long": 33,
    "Action is invalid or not supported": 34,
    "Invalid source address in outbound message": 35,
    "Invalid destination address in outbound message": 36,
    "Not enough Toncoin": 37,
    "Not enough extra currencies": 38,
    "Outbound message does not fit into a cell after rewriting": 39,
    "Cannot process a message": 40,
    "Library reference is null": 41,
    "Library change action error": 42,
    "Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree": 43,
    "Account state size exceeded limits": 50,
    "Null reference exception": 128,
    "Invalid serialization prefix": 129,
    "Invalid incoming message": 130,
    "Constraints error": 131,
    "Access denied": 132,
    "Contract stopped": 133,
    "Invalid argument": 134,
    "Code of a contract was not found": 135,
    "Invalid standard address": 136,
    "Not a basechain address": 138,
    "Not enough TON": 15304,
    "Lottery closed": 19287,
    "Not yet": 36845,
} as const

const Lottery_types: ABIType[] = [
    {"name":"DataSize","header":null,"fields":[{"name":"cells","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bits","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"refs","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"SignedBundle","header":null,"fields":[{"name":"signature","type":{"kind":"simple","type":"fixed-bytes","optional":false,"format":64}},{"name":"signedData","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounceable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"MessageParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"DeployParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"init","type":{"kind":"simple","type":"StateInit","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"BasechainAddress","header":null,"fields":[{"name":"hash","type":{"kind":"simple","type":"int","optional":true,"format":257}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"BuyTicket","header":3031985754,"fields":[]},
    {"name":"Draw","header":25682509,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"Lottery$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"ticketPrice","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"startTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"endTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"interval","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"consumers","type":{"kind":"dict","key":"int","value":"address"}},{"name":"ticketCounts","type":{"kind":"dict","key":"address","value":"int"}},{"name":"counter","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"lastWinner1","type":{"kind":"simple","type":"address","optional":true}},{"name":"lastWinner2","type":{"kind":"simple","type":"address","optional":true}},{"name":"lastWinner3","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"LastWinners","header":null,"fields":[{"name":"winner1","type":{"kind":"simple","type":"address","optional":true}},{"name":"winner2","type":{"kind":"simple","type":"address","optional":true}},{"name":"winner3","type":{"kind":"simple","type":"address","optional":true}}]},
]

const Lottery_opcodes = {
    "Deploy": 2490013878,
    "DeployOk": 2952335191,
    "FactoryDeploy": 1829761339,
    "BuyTicket": 3031985754,
    "Draw": 25682509,
}

const Lottery_getters: ABIGetter[] = [
    {"name":"balance","methodId":104128,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"params","methodId":116437,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"userTickets","methodId":104971,"arguments":[{"name":"user","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"lastWinners","methodId":104779,"arguments":[],"returnType":{"kind":"simple","type":"LastWinners","optional":false}},
]

export const Lottery_getterMapping: { [key: string]: string } = {
    'balance': 'getBalance',
    'params': 'getParams',
    'userTickets': 'getUserTickets',
    'lastWinners': 'getLastWinners',
}

const Lottery_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"text","text":"buy"}},
    {"receiver":"internal","message":{"kind":"text","text":"draw"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]


export class Lottery implements Contract {
    
    public static readonly storageReserve = 0n;
    public static readonly errors = Lottery_errors_backward;
    public static readonly opcodes = Lottery_opcodes;
    
    static async init(owner: Address) {
        return await Lottery_init(owner);
    }
    
    static async fromInit(owner: Address) {
        const __gen_init = await Lottery_init(owner);
        const address = contractAddress(0, __gen_init);
        return new Lottery(address, __gen_init);
    }
    
    static fromAddress(address: Address) {
        return new Lottery(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Lottery_types,
        getters: Lottery_getters,
        receivers: Lottery_receivers,
        errors: Lottery_errors,
    };
    
    constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: "buy" | "draw" | Deploy) {
        
        let body: Cell | null = null;
        if (message === "buy") {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === "draw") {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getBalance(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('balance', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getParams(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('params', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getUserTickets(provider: ContractProvider, user: Address) {
        const builder = new TupleBuilder();
        builder.writeAddress(user);
        const source = (await provider.get('userTickets', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getLastWinners(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('lastWinners', builder.build())).stack;
        const result = loadGetterTupleLastWinners(source);
        return result;
    }
    
}