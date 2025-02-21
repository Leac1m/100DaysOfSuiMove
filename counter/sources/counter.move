/// Module: counter
module counter::counter {

    const ENotOwner: u64 = 1;

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

    public fun increment(counter: &mut Counter) {
        counter.value = counter.value + 1;
    }

    public fun reset(counter: &mut Counter, ctx: &mut TxContext) {
        assert!(counter.owner == ctx.sender(), ENotOwner);
        counter.value = 0;
    }
 }
