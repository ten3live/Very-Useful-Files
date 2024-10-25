import React, {useContext} from 'react';
import {View, Text, Button} from 'react-native';
import {CartContext} from './CartProvider';

export default function Cart() {
  const {products, removeProduct, updateProduct} = useContext(CartContext);

  return (
    <View>
      <Text>Cart</Text>
      {products.map(product => (
        <View key={product.id}>
          <Text>{product.name}</Text>
          <Button title="Remove" onPress={() => removeProduct(product.id)} />
          <Button
            title="Update"
            onPress={() =>
              updateProduct({...product, name: 'Updated Product Name'})
            }
          />
        </View>
      ))}
    </View>
  );
}
