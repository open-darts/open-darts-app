import {styled} from 'nativewind';

export default function Social() {
    return (
        < styled.SafeAreaView
            className="flex-1 bg-background">
            < styled.View
                className="p-base pb-3xl">
                < styled.Text
                    className="text-slate-800 text-2xl font-bold"> Social
                < /styled.Text>
            < /styled.View>
        < /styled.SafeAreaView>
    );
}