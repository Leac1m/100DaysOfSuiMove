
#[test_only]
module counter::counter_tests {
    use counter::counter::{Self, Counter};
    use sui::test_scenario::{Self as test, next_tx, ctx};

    const OWNER: address = @0xAD;
    const USER: address = @0xAB;

    // create a counter
    #[test]
    fun test_create_counter() {
        let mut scenario = test::begin(OWNER);
        counter::create(ctx(&mut scenario));

        next_tx(&mut scenario, OWNER);
        {
            let counter = test::take_from_sender<Counter>(&scenario);
            test::return_to_sender(&scenario, counter);
        };
        test::end(scenario);

    }

    // increment the counter.
    #[test]
    fun test_increment_counter() {
        let mut scenario = test::begin(OWNER);
        counter::create(ctx(&mut scenario));

        next_tx(&mut scenario, OWNER);
        {
            let mut counter = test::take_from_sender<Counter>(&scenario);
            counter.increment();

            assert!(counter.check_value() == 1);
            test::return_to_sender(&scenario, counter);
        };
        test::end(scenario);
    }

    // decrement the counter.
    #[test]
    fun test_decrement_counter() {
        let mut scenario = test::begin(OWNER);
        counter::create(ctx(&mut scenario));

        next_tx(&mut scenario, OWNER);
        {
            let mut counter = test::take_from_sender<Counter>(&scenario);
            counter.increment();
            counter.increment();

            counter.decrement();
            assert!(counter.check_value() == 1);
            test::return_to_sender(&scenario, counter);
        };
        test::end(scenario);
    }

    // can't decrement counter below zero
    #[test, expected_failure(abort_code = ::counter::counter::EZeroReached)]
    fun test_decrement_below_one_will_fail() {
        let mut scenario = test::begin(OWNER);
        counter::create(ctx(&mut scenario));

        next_tx(&mut scenario, OWNER);
        {
            let mut counter = test::take_from_sender<Counter>(&scenario);

            counter.decrement();

            test::return_to_sender(&scenario, counter);
        };
        test::end(scenario);
    }

    // owenr can reset the counter.
    #[test]
    fun test_reset_as_owner() {
        let mut scenario = test::begin(OWNER);
        counter::create(ctx(&mut scenario));

        next_tx(&mut scenario, OWNER);
        let mut counter = test::take_from_sender<Counter>(&scenario);
        {
            counter.increment();
            assert!(counter.check_value() == 1);

            counter.reset(ctx(&mut scenario));
            assert!(counter.check_value() == 0);
            test::return_to_sender(&scenario, counter);
        };
        
        test::end(scenario);
    }

    // only owner can reset the counter.
    #[test, expected_failure(abort_code = ::counter::counter::ENotOwner)]
    fun test_reset_as_user_will_fail() {
        let mut scenario = test::begin(OWNER);
        counter::create(ctx(&mut scenario));

        next_tx(&mut scenario, USER);
        let mut counter = test::take_from_address<Counter>(&scenario, OWNER);
        {
            counter.increment();
            assert!(counter.check_value() == 1);
            
            counter.reset(ctx(&mut scenario));
            assert!(counter.check_value() == 0);
            test::return_to_sender(&scenario, counter);
        };
        
        test::end(scenario);

    }
}

