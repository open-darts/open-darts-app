import {SafeAreaView, View, Text} from 'react-native';
import Header from '@/src/components/common/Header';
import HeaderText from '@/src/components/common/HeaderText';

export default function Social() {
    return (
        <SafeAreaView className="flex-1 bg-background">
            <Header>
                <View className="flex-1"/>
                <View className="flex-2 items-center">
                    <HeaderText title="Social"/>
                </View>
                <View className="flex-1"/>
            </Header>
            <View className="p-base pb-3xl">
                <Text className="text-slate-800 text-2xl font-bold">Connect with Friends</Text>
            </View>
        </SafeAreaView>
    );
}