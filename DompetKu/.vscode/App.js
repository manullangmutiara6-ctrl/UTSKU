import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  SafeAreaView 
} from 'react-native';

export default function App() {
  const [deskripsi, setDeskripsi] = useState('');
  const [nominal, setNominal] = useState('');
  const [transaksi, setTransaksi] = useState([]);

  // Fungsi untuk menghitung total saldo
  const hitungSaldo = () => {
    return transaksi.reduce((total, item) => {
      return item.tipe === 'masuk' ? total + item.nominal : total - item.nominal;
    }, 0);
  };

  // Fungsi menambah transaksi
  const tambahTransaksi = (tipe) => {
    if (!deskripsi || !nominal) return alert("Isi semua data!");

    const baru = {
      id: Math.random().toString(),
      ket: deskripsi,
      nominal: parseInt(nominal),
      tipe: tipe, // 'masuk' atau 'keluar'
    };

    setTransaksi([baru, ...transaksi]);
    setDeskripsi('');
    setNominal('');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Saldo */}
      <View style={styles.headerCard}>
        <Text style={styles.headerTitle}>Total Saldo</Text>
        <Text style={styles.saldoText}>Rp {hitungSaldo().toLocaleString()}</Text>
      </View>

      {/* Form Input */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Deskripsi (Cth: Beli Makan)"
          value={deskripsi}
          onChangeText={setDeskripsi}
        />
        <TextInput
          style={styles.input}
          placeholder="Nominal (Cth: 50000)"
          keyboardType="numeric"
          value={nominal}
          onChangeText={setNominal}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: '#2ecc71' }]} 
            onPress={() => tambahTransaksi('masuk')}
          >
            <Text style={styles.buttonText}>Pemasukan</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: '#e74c3c' }]} 
            onPress={() => tambahTransaksi('keluar')}
          >
            <Text style={styles.buttonText}>Pengeluaran</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* List History */}
      <Text style={styles.historyTitle}>Riwayat Transaksi</Text>
      <FlatList
        data={transaksi}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listKet}>{item.ket}</Text>
            <Text style={[
              styles.listNominal, 
              { color: item.tipe === 'masuk' ? '#2ecc71' : '#e74c3c' }
            ]}>
              {item.tipe === 'masuk' ? '+' : '-'} Rp {item.nominal.toLocaleString()}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6fa', padding: 20 },
  headerCard: {
    backgroundColor: '#3498db',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  headerTitle: { color: '#fff', fontSize: 16 },
  saldoText: { color: '#fff', fontSize: 32, fontWeight: 'bold' },
  form: { marginBottom: 20 },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#dcdde1',
  },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  button: { flex: 1, padding: 15, borderRadius: 10, marginHorizontal: 5, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  historyTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  listItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    elevation: 2,
  },
  listKet: { fontSize: 16 },
  listNominal: { fontSize: 16, fontWeight: 'bold' },
});