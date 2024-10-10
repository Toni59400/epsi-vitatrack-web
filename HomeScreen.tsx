import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Alert, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { LineChart } from 'react-native-chart-kit';
import moment from 'moment';

const SERVER_URL = 'http://10.60.12.54:8086/api/sensors/data';

interface SensorData {
    temperature: number;
    humidity: number;
    timestamp: string;
}

interface ChartData {
    temperature: number[];
    humidity: number[];
    timestamps: string[];
}

export default function HomeScreen() {
    const [allData, setAllData] = useState<SensorData[]>([]);
    const [data, setData] = useState<ChartData | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(moment());

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(SERVER_URL);
            setAllData(response.data);
            setDataForDate(moment());
        } catch (error) {
            Alert.alert('Erreur', 'Impossible de récupérer les données');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const setDataForDate = (date: moment.Moment) => {
        const startOfDay = date.clone().startOf('day').toISOString();
        const endOfDay = date.clone().endOf('day').toISOString();

        const filteredData = allData.filter(item => {
            const itemDate = moment(item.timestamp);
            return itemDate.isBetween(startOfDay, endOfDay);
        });

        const temperatures = filteredData.map(item => item.temperature);
        const humidities = filteredData.map(item => item.humidity);
        const labels = filteredData.map(item => moment(item.timestamp).format('HH:mm'));

        setData({
            temperature: temperatures,
            humidity: humidities,
            timestamps: labels,
        });
    };

    const getHumidityColor = (humidity: number) => {
        return humidity > 60 || humidity < 40 ? 'rgba(255, 0, 0, 0.5)' : 'rgba(0, 255, 0, 0.5)';
    };

    const chartConfig = {
        backgroundColor: '#e26a00',
        backgroundGradientFrom: '#fb8c00',
        backgroundGradientTo: '#ffa726',
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16,
        },
        propsForDots: {
            r: '0',
        },
        propsForBackgroundLines: {
            strokeWidth: 0.5,
            stroke: 'rgba(255, 255, 255, 0.2)',
        },
    };

    const renderDateOptions = () => {
        const availableDates = [...new Set(allData.map(item => moment(item.timestamp).format('DD/MM/YYYY')))];
        return (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScrollView}>
                {availableDates.map((dateStr, index) => {
                    const date = moment(dateStr, 'DD/MM/YYYY');
                    return (
                        <TouchableOpacity
                            key={index}
                            style={[styles.dateOption, selectedDate.isSame(date, 'day') && styles.selectedDateOption]}
                            onPress={() => {
                                setSelectedDate(date);
                                setDataForDate(date);
                            }}
                        >
                            <Text style={styles.dateText}>{date.format('DD/MM/YYYY')}</Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={require('./assets/logo.png')} style={styles.logo} />
            <Text style={styles.title}>Données du capteur - Température et Humidité</Text>

            {renderDateOptions()}

            {loading ? (
                <Text>Chargement des données...</Text>
            ) : (
                data && (
                    <>
                        <Text style={styles.chartTitle}>Température (°C)</Text>
                        <LineChart
                            data={{
                                labels: data.timestamps,
                                datasets: [
                                    {
                                        data: data.temperature,
                                        color: () => 'rgba(75, 192, 192, 0.5)',
                                        strokeWidth: 2,
                                    },
                                ],
                            }}
                            width={Dimensions.get('window').width - 16}
                            height={220}
                            yAxisSuffix="°C"
                            chartConfig={chartConfig}
                            bezier
                            style={styles.chart}
                        />

                        <Text style={styles.chartTitle}>Humidité (%)</Text>
                        <LineChart
                            data={{
                                labels: data.timestamps,
                                datasets: [
                                    {
                                        data: data.humidity,
                                        color: () => 'rgba(255, 0, 0, 0.5)',
                                        strokeWidth: 2,
                                    },
                                ],
                            }}
                            width={Dimensions.get('window').width - 16}
                            height={220}
                            yAxisSuffix="%"
                            chartConfig={chartConfig}
                            bezier
                            style={styles.chart}
                        />
                    </>
                )
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#A2E665', // Même couleur de fond que les autres pages
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    chartTitle: {
        fontSize: 18,
        marginTop: 20,
        textAlign: 'center',
        color: '#333',
    },
    chart: {
        marginVertical: 8,
        borderRadius: 16,
    },
    dateScrollView: {
        marginVertical: 10,
    },
    dateOption: {
        padding: 10,
        marginHorizontal: 5,
        backgroundColor: '#ddd',
        borderRadius: 10,
    },
    selectedDateOption: {
        backgroundColor: '#ffa726',
    },
    dateText: {
        fontSize: 14,
        color: '#333',
    },
});
