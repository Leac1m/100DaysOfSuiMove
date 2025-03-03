/// Module: counter
module counter::counter {

    const ENotOwner: u64 = 1;
    const EZeroReached: u64 = 2;

    public struct Counter has key, store {
        id: UID,
        value: u64,
        owner: address
    }

    
    fun init(ctx: &mut TxContext) {
        let counter = Counter {
            id: object::new(ctx),
            value: 0,
            owner: ctx.sender()
        };

        transfer::public_share_object(counter);
    }

    #[allow(lint(self_transfer))]
    public fun create(ctx: &mut TxContext) {
        transfer::public_transfer(
            Counter {
            id: object::new(ctx),
            value: 0,
            owner: ctx.sender() }
        , ctx.sender());
    }

    public fun increment(counter: &mut Counter) {
        counter.value = counter.value + 1;
    }

    public fun decrement(counter: &mut Counter) {
        assert!(counter.value > 0, EZeroReached);
        counter.value = counter.value - 1;

    }

    public fun reset(counter: &mut Counter, ctx: &mut TxContext) {
        assert!(counter.owner == ctx.sender(), ENotOwner);
        counter.value = 0;
    }

    #[test_only]
    public fun test_init(ctx: &mut TxContext) {
        init(ctx)
    }

    #[test_only]
    public fun check_value(counter: &Counter): u64 {
        counter.value
    }
 }
