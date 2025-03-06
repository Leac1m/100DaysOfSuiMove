/// Module: counter
module counter::counter {
    use sui::event;

    const ENotOwner: u64 = 1;
    const EZeroReached: u64 = 2;

    public struct Counter has key, store {
        id: UID,
        value: u64,
        owner: address
    }

    public struct CounterCreated has drop, copy {
        id: ID,
        owner: address
    }

    public struct CounterIncremented has drop, copy {
        id: ID,
        new_value: u64
    }

    public struct CounterDecremented has drop, copy {
        id: ID,
        new_value: u64
    }

    public struct CounterReset has drop, copy {
        id: ID
    }
    
    fun init(ctx: &mut TxContext) {
        let counter = Counter {
            id: object::new(ctx),
            value: 0,
            owner: ctx.sender()
        };

        event::emit(CounterCreated {
            id: counter.id.to_inner(),
            owner: counter.owner
        });

        transfer::public_share_object(counter);
    }

    #[allow(lint(self_transfer))]
    public fun create(ctx: &mut TxContext) {
        let counter =  Counter{
            id: object::new(ctx),
            value: 0,
            owner: ctx.sender()
        };
        
        event::emit(CounterCreated{
            id: counter.id.to_inner(),
            owner: counter.owner
        });

        transfer::public_transfer(counter, ctx.sender());
    }

    public fun increment(counter: &mut Counter) {
        counter.value = counter.value + 1;

        event::emit(CounterIncremented {
            id: counter.id.to_inner(),
            new_value: counter.value
        });
    }

    public fun decrement(counter: &mut Counter) {
        assert!(counter.value > 0, EZeroReached);
        counter.value = counter.value - 1;

        event::emit(CounterDecremented {
            id: counter.id.to_inner(),
            new_value: counter.value
        });
    }

    public fun reset(counter: &mut Counter, ctx: &mut TxContext) {
        assert!(counter.owner == ctx.sender(), ENotOwner);
        counter.value = 0;

        event::emit(CounterReset {
            id: counter.id.to_inner()
        });
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
