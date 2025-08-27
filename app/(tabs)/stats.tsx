import {SafeAreaView, View, Text} from 'react-native';
import Header from '@/src/components/common/Header';
import HeaderText from '@/src/components/common/HeaderText';

export default function Stats() {
    return (
        <SafeAreaView className="flex-1 bg-background">
            <Header>
                <View className="flex-1"/>
                <View className="flex-2 items-center">
                    <HeaderText title="Stats"/>
                </View>
                <View className="flex-1"/>
            </Header>
            <View className="p-base pb-3xl">
                <Text className="text-slate-800 text-2xl font-bold">Statistics</Text>
            </View>
        </SafeAreaView>
    );
}