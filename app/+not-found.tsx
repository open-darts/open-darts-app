import {Stack} from 'expo-router';
import {styled} from 'nativewind';

export default function NotFoundScreen() {
    return (
        < >
            < Stack.Screen
    options = {
    {
        title: 'Oops! Not Found'
    }
}
    />
            < styled.View
    className = "flex-1 bg-slate-800 justify-center items-center" >
                < styled.Link
    href = "/"
    className = "text-xl underline text-white" >
                    Not found. Go back to Home screen!
                < /styled.Link>
            < /styled.View>
        < />
    );
}