
# Tahiri Services Styles
Styling Library for React Native CLI



## Installation

To Install

```bash
  npm install tahiriservices
```


## 🚀 About Me
I'm a full stack developer...


## Support

For support, email ten3live@gmail.com or visit https://tahiriservices.vercel.app


## For

 React, React Native, Expo



## Usage/Examples

```javascript
   

  import React from 'react';
  import { View, StyleSheet } from 'react-native';
  import {CButton,CDropDown} from 'tahiriservices'

  const App = () => {
    const options = [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
    ];

    const handleSelect = (selectedOption) => {
      console.log('Selected option:', selectedOption);
    };

    return (
      <View style={styles.container}>
        <CustomDropdown
          options={options}
          onSelect={handleSelect}
          placeholder="Select an option"
        />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
    },
  });

  export default App;

```

