import React, {useContext} from 'react';
import {View, Text, Button} from 'react-native';
import {CartContext} from './CartProvider';

export default function Home({navigation}) {
  const {addProduct} = useContext(CartContext);

  const handlePress = () => {
    addProduct({id: 1, name: 'Product 1'});
    navigation.navigate('Cart');
  };

  return (
    <View>
      <Text>Home</Text>
      <Button title="Add to cart" onPress={handlePress} />
    </View>
  );
}
