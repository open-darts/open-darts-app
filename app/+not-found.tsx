import {Stack} from 'expo-router';
import {styled} from 'nativewind';

export default function NotFoundScreen() {
    return (
        &lt; >
        &lt; Stack.Screen
    options = {
    {
        title: 'Oops! Not Found'
    }
}
    />
    &lt; styled.View
    className = "flex-1 bg-slate-800 justify-center items-center" >
        &lt; styled.Link
    href = "/"
    className = "text-xl underline text-white" >
                    Not found. Go back to Home screen!
    &lt; /styled.Link>
    &lt; /styled.View>
    &lt; />
    );
}