import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';

const AvailableMeals = (props) => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    const fetchMeals = async () => {
        const url =
            'https://react-http-demo-bdfc5-default-rtdb.firebaseio.com/meals.json';
        const response = await (await fetch(url)).json();

        if (!response) {
            throw new Error('Something went wrong!');
        }

        const loadedMeals = [];
        for (const key in response) {
            const { name, description, price } = response[key];
            loadedMeals.push({
                id: key,
                name: name,
                description: description,
                price: price,
            });
        }
        setMeals(loadedMeals);
        setIsLoading(false);
    };

    useEffect(() => {
        // 這裡不能用try...catch捕捉錯誤，因為fetchMeals回傳Promise，不會進catch{}
        fetchMeals().catch((error) => {
            setError(error.message);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return (
            <section className={classes['meals-loading']}>
                <p>Loading...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className={classes['meals-error']}>
                <p>{error}</p>
            </section>
        );
    }

    const mealsList = meals.map((meal) => (
        <MealItem
            id={meal.id}
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    ));

    return (
        <section className={classes.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;
