import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  Modal,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  PanResponder,
  Dimensions,
  Animated,
  Button,
  TextInput,
  TouchableOpacity,
  Pressable,
  Linking,
  Keyboard,
  ActivityIndicator,
  Switch,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const useAPI = fn => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fn();
      setData(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return {data, loading, refetch};
};

const useFetch = url => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setData(data));
  }, [url]);

  return [data];
};

const CText = ({
  onPress,
  children,
  size = 16,
  color = 'black',
  style = null,
}) => (
  <Text onPress={onPress} style={[{fontSize: size, color: color}, style]}>
    {children}
  </Text>
);
const dismissKeyboard = () => {
  Keyboard.dismiss();
};
const CView = ({children, style = style ? style : null}) => (
  <Pressable
    onPress={dismissKeyboard}
    style={[{margin: 0, backgroundColor: 'white'}, style]}>
    {children}
  </Pressable>
);

const CViewCenter = ({children, style = null}) => (
  <Pressable
    onPress={dismissKeyboard}
    style={[
      {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: 'white',
      },
      style,
    ]}>
    {children}
  </Pressable>
);
const CFlexView = ({children, style = null}) => (
  <Pressable
    onPress={dismissKeyboard}
    style={[{flexDirection: 'row', backgroundColor: 'white'}, style]}>
    {children}
  </Pressable>
);
const CFlexCenter = ({children, style = null}) => (
  <Pressable
    onPress={dismissKeyboard}
    style={[
      {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        textAlign: 'center',
      },
      style,
    ]}>
    {children}
  </Pressable>
);

const CInput = ({
  placeholder,
  value = '',
  onChangeText,
  style = null,
  width = 220,
  color = '#0c0c0c',
  bgColor = '#f4f4f5',
  placeholderTextColor = '#78787f',
  isPassword = false,
}) => {
  const [visp, setVisp] = useState(true);
  const [secureText, setSecureText] = useState(isPassword);
  const textInputRef = React.useRef(null);

  const textrefPress = () => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  };
  const togglePasswordVisibility = () => {
    setSecureText(!secureText);
  };
  const handleFocus = () => {
    setVisp(false);
  };

  const handleBlur = () => {
    setVisp(true);
  };

  return (
    <View
      style={{
        borderRadius: 12,
        padding: 8,
        justifyContent: 'flex-start',
        marginTop: 10,
        backgroundColor: bgColor,
      }}>
      {visp && value == '' && (
        <CText
          style={{zIndex: 1, position: 'absolute', marginLeft: 8, marginTop: 5}}
          onPress={textrefPress}
          size={12}
          color={placeholderTextColor}>
          {placeholder}
        </CText>
      )}
      <TouchableOpacity
        style={{width: width, display: 'flex', flexDirection: 'row'}}
        onPress={textrefPress}>
        <TextInput
          secureTextEntry={secureText}
          ref={textInputRef}
          style={[
            {
              borderWidth: 0,
              width: '80%',
              height: 25,
              color: color,
              zIndex: 2,
              padding: 3,
            },
            style,
          ]}
          placeholderTextColor={'#848484'}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={{padding: 4}}>
          {isPassword && (
            <Text style={{color: '#7b7b82'}}>
              {secureText ? 'Show' : 'Hide'}
            </Text>
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};
const CInputArea = ({
  placeholder,
  value = '',
  onChangeText,
  style = null,
  width = 220,
  color = '#0c0c0c',
  bgColor = '#f4f4f5',
  placeholderTextColor = '#78787f',
}) => {
  const [visp, setVisp] = useState(true);
  const textInputRef = React.useRef(null);

  const textrefPress = () => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  };
  const handleFocus = () => {
    setVisp(false);
  };

  const handleBlur = () => {
    setVisp(true);
  };

  return (
    <View
      style={{
        borderRadius: 12,
        padding: 8,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 10,
        backgroundColor: bgColor,
      }}>
      {visp && value == '' && (
        <CText
          style={{zIndex: 1, position: 'absolute', marginLeft: 8, marginTop: 5}}
          onPress={textrefPress}
          size={12}
          color={placeholderTextColor}>
          {placeholder}
        </CText>
      )}
      <TouchableOpacity
        style={{width: width, display: 'flex', flexDirection: 'row'}}
        onPress={textrefPress}>
        <TextInput
          multiline
          ref={textInputRef}
          style={[
            {
              borderWidth: 0,
              width: 200,
              height: 150,
              minHeight: 150,
              color: color,
              zIndex: 2,
              textAlignVertical: 'top',
              flexWrap: 'wrap',
              padding: 3,
            },
            style,
          ]}
          placeholderTextColor={'#848484'}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </TouchableOpacity>
    </View>
  );
};

const CButton = ({
  bgcolor = 'blue',
  color = 'white',
  title,
  onPress,
  style = null,
}) => (
  <TouchableOpacity
    style={[
      {
        width: 120,
        margin: 10,
        padding: 5,
        backgroundColor: bgcolor,
        borderRadius: 10,
        textAlign: 'center',
        color: color,
        justifyContent: 'center',
        alignItems: 'center',
      },
      style,
    ]}
    onPress={onPress}>
    <Text style={{color: 'white'}}>{title}</Text>
  </TouchableOpacity>
);
const CCheckbox = ({checked = false, onPress, label}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handlePress = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState); // Toggle the local state
    if (onPress) {
      onPress(newCheckedState); // Notify parent component of the change
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      style={{flexDirection: 'row', alignItems: 'center'}}>
      <View
        style={{
          height: 20,
          width: 20,
          borderWidth: 1,

          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          display: 'flex',
          borderColor: 'gray',
          backgroundColor: isChecked ? 'dodgerblue' : 'white',
          marginRight: 8,
        }}>
        {isChecked && <Icon color="white" size={20} name={'check'}></Icon>}
      </View>
      <Text>{label}</Text>
    </Pressable>
  );
};
const CRadioButton = ({checked = false, onPress, label}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handlePress = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState); // Toggle the local state
    if (onPress) {
      onPress(newCheckedState); // Notify parent component of the change
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      style={{flexDirection: 'row', alignItems: 'center'}}>
      <View
        style={{
          borderRadius: 100,
          height: 20,
          width: 20,
          borderWidth: 1,
          borderColor: 'gray',
          backgroundColor: isChecked ? 'blue' : 'white',
          marginRight: 8,
        }}></View>
      <Text>{label}</Text>
    </Pressable>
  );
};

const CSwitch = ({value, onValueChange}) => (
  <Switch value={value} onValueChange={onValueChange} />
);

const CLink = ({url, title, style = null}) => (
  <Text
    style={[{color: 'blue', textDecorationLine: 'underline'}, style]}
    onPress={() => Linking.openURL(url)}>
    {title}
  </Text>
);

// Image

const CImage = ({source, style = null}) => (
  <Image source={source} style={[{width: 100, height: 100}, style]} />
);

const CScrollView = ({children, style = null}) => (
  <ScrollView style={[{padding: 10}, style]}>{children}</ScrollView>
);
const CScrollViewFlex = ({children, style = null}) => (
  <ScrollView horizontal style={[{padding: 10}, style]}>
    {children}
  </ScrollView>
);

const CFlatList = ({data, renderItem}) => (
  <FlatList
    data={data}
    renderItem={renderItem}
    keyExtractor={(item, index) => index.toString()}
  />
);

const CModal = ({title = 'Modal', children}) => {
  const [modalvisible, setModalVisible] = useState(false);
  return (
    <>
      {modalvisible ? (
        <CView style={{margin: 20}}>
          <CView>
            <CFlexView
              style={{justifyContent: 'space-between', alignItems: 'center'}}>
              <CText style={{fontSize: 20, fontWeight: 'bold'}}>{title}</CText>
              <CButton
                onPress={() => setModalVisible(false)}
                style={{
                  borderRadius: 100,
                  textAlign: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 30,
                  height: 30,
                  backgroundColor: 'black',
                  color: 'white',
                }}
                title={'X'}></CButton>
            </CFlexView>
            <CView style={{minHeight: 200}}>
              <CText>{children}</CText>
            </CView>
            <CFlexCenter>
              <CButton
                style={{}}
                title={'Yes'}
                onPress={() => setModalVisible(false)}></CButton>
              <CButton
                style={{backgroundColor: 'grey'}}
                title={'Cancel'}
                onPress={() => setModalVisible(false)}></CButton>
            </CFlexCenter>
          </CView>
        </CView>
      ) : (
        <CButton
          title={'Open Modal'}
          onPress={() => setModalVisible(true)}></CButton>
      )}
    </>
  );
};

const CCard = ({title, children, style = null}) => (
  <View
    style={[{borderWidth: 1, borderRadius: 8, padding: 10, margin: 10}, style]}>
    {title && (
      <Text style={{fontWeight: 'bold', marginBottom: 8}}>{title}</Text>
    )}
    {children}
  </View>
);

const CTabs = ({tabs}) => {
  const [activeTab, setActiveTab] = useState(tabs[0].key);

  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        {tabs.map(tab => (
          <TouchableOpacity key={tab.key} onPress={() => setActiveTab(tab.key)}>
            <Text
              style={{
                margin: 10,
                fontWeight: activeTab === tab.key ? 'bold' : 'normal',
              }}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View>{tabs.find(tab => tab.key === activeTab)?.content}</View>
    </View>
  );
};

const CToast = ({message, visible, onHide, type = 'success'}) => {
  const [isVisible, setIsVisible] = useState(visible);

  // Usage
  //  {action && (
  //           <CToast
  //             onHide={() => setaction(false)}
  //             visible={true}
  //             message={'Error'}></CToast>
  //         )}

  useEffect(() => {
    let timer;
    if (visible) {
      setIsVisible(true);
      timer = setTimeout(() => {
        setIsVisible(false);
        if (onHide) {
          onHide(); // Notify parent component about hiding the toast
        }
      }, 5000); // 120 seconds = 120000 ms
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [visible]);

  if (!isVisible) return null;
  return (
    <View
      style={{
        margin: 10,
        backgroundColor: type == 'error' ? 'red' : 'limegreen',
        padding: 10,
        borderRadius: 5,
      }}>
      <Text
        style={{
          color: type == 'error' ? 'white' : 'white',
          textAlign: 'center',
        }}>
        {message}
      </Text>
    </View>
  );
};

const CFAB = ({onPress, style = null}) => (
  <TouchableOpacity style={[styles.fab, style]} onPress={onPress}>
    <Text style={{color: 'white', fontSize: 20}}>+</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  fab: {
    width: 56,
    height: 56,
    backgroundColor: 'blue',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
});

const CSearchBar2 = ({value, onChangeText, placeholder}) => (
  <View
    style={{
      flexDirection: 'row',
      padding: 10,
      borderWidth: 1,
      borderRadius: 8,
    }}>
    <TextInput
      style={{flex: 1}}
      placeholder={placeholder || 'Search'}
      value={value}
      onChangeText={onChangeText}
    />
  </View>
);

const CBadge = ({count, style = null}) => (
  <View
    style={[
      {
        minWidth: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
      },
      style,
    ]}>
    <Text style={{color: 'white', fontSize: 12}}>{count}</Text>
  </View>
);

const CAvatar = ({size = 50, uri, placeholder}) => (
  <View
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      overflow: 'hidden',
      backgroundColor: 'gray',
    }}>
    {uri ? (
      <Image source={{uri}} style={{width: '100%', height: '100%'}} />
    ) : (
      <Text style={{color: 'white', textAlign: 'center', lineHeight: size}}>
        {placeholder || '?'}
      </Text>
    )}
  </View>
);

const CChip = ({label, onPress, selected, style = null}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: selected ? 'blue' : 'gray',
        backgroundColor: selected ? 'blue' : 'white',
      },
      style,
    ]}>
    <Text style={{color: selected ? 'white' : 'black'}}>{label}</Text>
  </TouchableOpacity>
);

const CStepper = ({value, onIncrement, onDecrement}) => (
  <View style={{flexDirection: 'row', alignItems: 'center'}}>
    <TouchableOpacity
      onPress={onDecrement}
      style={{padding: 10, borderWidth: 1}}>
      <Text>-</Text>
    </TouchableOpacity>
    <Text style={{marginHorizontal: 10}}>{value}</Text>
    <TouchableOpacity
      onPress={onIncrement}
      style={{padding: 10, borderWidth: 1}}>
      <Text>+</Text>
    </TouchableOpacity>
  </View>
);

const CPagination = ({currentPage, totalPages, onPageChange}) => (
  <View style={{flexDirection: 'row', justifyContent: 'center', margin: 10}}>
    <TouchableOpacity
      disabled={currentPage === 1}
      onPress={() => onPageChange(currentPage - 1)}>
      <Text style={{marginHorizontal: 10}}>{'<'}</Text>
    </TouchableOpacity>
    <Text>
      {currentPage} / {totalPages}
    </Text>
    <TouchableOpacity
      disabled={currentPage === totalPages}
      onPress={() => onPageChange(currentPage + 1)}>
      <Text style={{marginHorizontal: 10}}>{'>'}</Text>
    </TouchableOpacity>
  </View>
);

const CTooltip = ({message, children, visible}) => (
  <View style={{position: 'relative'}}>
    {visible && (
      <View
        style={{
          position: 'absolute',
          top: -30,
          backgroundColor: 'black',
          padding: 5,
          borderRadius: 5,
        }}>
        <Text style={{color: 'white', fontSize: 12}}>{message}</Text>
      </View>
    )}
    {children}
  </View>
);

const CDivider = ({color = 'gray', thickness = 1}) => (
  <View
    style={{height: thickness, backgroundColor: color, marginVertical: 10}}
  />
);

const CSpinner = ({size = 'large', color = 'blue'}) => (
  <ActivityIndicator size={size} color={color} />
);
const CSpacer = ({children}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={spacerstyles.container}></View>
          <View style={spacerstyles.smallcontainer}></View>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={spacerstyles.container}></View>
          <View style={spacerstyles.smallcontainer}></View>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={spacerstyles.smallcontainer}></View>
          <View style={spacerstyles.container}></View>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={spacerstyles.smallcontainer}></View>
          <View style={spacerstyles.container}></View>
        </View>
      </View>
      <View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={spacerstyles.container}></View>
          <View style={spacerstyles.smallcontainer}></View>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={spacerstyles.container}></View>
          <View style={spacerstyles.smallcontainer}></View>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={spacerstyles.smallcontainer}></View>
          <View style={spacerstyles.container}></View>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={spacerstyles.smallcontainer}></View>
          <View style={spacerstyles.container}></View>
        </View>
      </View>
    </View>
  );
};
const spacerstyles = StyleSheet.create({
  smallcontainer: {
    width: 40,
    marginHorizontal: 5,
    height: 60,
    backgroundColor: '#f4f4f5',
  },
  container: {
    marginVertical: 5,
    height: 60,
    width: 80,
    marginHorizontal: 5,

    backgroundColor: '#f4f4f5',
  },
});

const CBreadcrumbs = ({items}) => (
  <View style={{flexDirection: 'row', alignItems: 'center'}}>
    {items.map((item, index) => (
      <View key={index} style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={item.onPress}>
          <Text style={{color: 'blue'}}>{item.label}</Text>
        </TouchableOpacity>
        {index < items.length - 1 && (
          <Text style={{marginHorizontal: 5}}>{'>'}</Text>
        )}
      </View>
    ))}
  </View>
);

const CNotificationBanner = ({message, backgroundColor = 'blue'}) => (
  <View
    style={{
      padding: 10,
      backgroundColor,
      position: 'absolute',
      top: 0,
      width: '100%',
      zIndex: 1,
    }}>
    <Text style={{color: 'white', textAlign: 'center'}}>{message}</Text>
  </View>
);

const CCarousel = ({items, itemWidth, style = null}) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={[{flexDirection: 'row'}, style]}>
    {items.map((item, index) => (
      <View key={index} style={{width: itemWidth, marginHorizontal: 5}}>
        <Image
          source={{uri: item.image}}
          style={{width: '100%', height: 150, borderRadius: 8}}
        />
      </View>
    ))}
  </ScrollView>
);

const CMultiSelect = ({options, selectedOptions, setSelectedOptions}) => {
  const toggleOption = option => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  //Usage const App = () => {
  //   const [selectedOptions, setSelectedOptions] = useState([]);

  //   const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  //   return (
  //     <View style={styles.container}>
  //       <Text style={styles.title}>Select Options:</Text>
  //       <CMultiSelect
  //         options={options}
  //         selectedOptions={selectedOptions}
  //         setSelectedOptions={setSelectedOptions}
  //       />
  //       <View style={styles.selectedContainer}>
  //         <Text style={styles.subtitle}>Selected Options:</Text>
  //         {selectedOptions.length > 0 ? (
  //           selectedOptions.map((option, index) => (
  //             <Text key={index} style={styles.selectedOption}>
  //               {option}
  //             </Text>
  //           ))
  //         ) : (
  //           <Text style={styles.noSelection}>No options selected</Text>
  //         )}
  //       </View>
  //     </View>
  //   );
  // };

  return (
    <View>
      {options.map((option, index) => (
        <TouchableOpacity key={index} onPress={() => toggleOption(option)}>
          <Text
            style={{
              padding: 10,
              backgroundColor: selectedOptions.includes(option)
                ? 'blue'
                : 'gray',
            }}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const CRating = ({maxStars = 5, onRating}) => {
  const [rating, setRating] = useState(0);

  const handleRating = value => {
    setRating(value);
    onRating(value);
  };

  return (
    <View style={{flexDirection: 'row'}}>
      {Array.from({length: maxStars}).map((_, index) => (
        <TouchableOpacity key={index} onPress={() => handleRating(index + 1)}>
          <Text style={{fontSize: 20, color: index < rating ? 'gold' : 'gray'}}>
            ★
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const CExpandableList = ({title, children}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
        <Text style={{fontWeight: 'bold'}}>{title}</Text>
      </TouchableOpacity>
      {isExpanded && <View>{children}</View>}
    </View>
  );
};

const CSpeedDial = ({actions}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={{position: 'absolute', bottom: 20, right: 20}}>
      {isOpen &&
        actions.map((action, index) => (
          <TouchableOpacity
            key={index}
            onPress={action.onPress}
            style={{
              marginBottom: 10,
              padding: 10,
              backgroundColor: 'gray',
              borderRadius: 5,
            }}>
            <Text style={{color: 'white'}}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      <TouchableOpacity
        onPress={() => setIsOpen(!isOpen)}
        style={{padding: 20, backgroundColor: 'blue', borderRadius: 50}}>
        <Text style={{color: 'white'}}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const CStepperProgress = ({steps, currentStep}) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 10,
    }}>
    {steps.map((step, index) => (
      <View key={index} style={{alignItems: 'center'}}>
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: index < currentStep ? 'blue' : 'gray',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white'}}>{index + 1}</Text>
        </View>
        <Text>{step}</Text>
      </View>
    ))}
  </View>
);

const CImageGrid = ({images, columns = 3}) => (
  <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
    {images.map((image, index) => (
      <Image
        key={index}
        source={{uri: image}}
        style={{
          width: `${100 / columns}%`,
          height: 100,
          margin: 2,
        }}
      />
    ))}
  </View>
);

const CTimeline = ({events}) => (
  <View>
    {events.map((event, index) => (
      <View key={index} style={{flexDirection: 'row', marginVertical: 10}}>
        <View style={{marginRight: 10, alignItems: 'center'}}>
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: 'blue',
            }}
          />
          {index < events.length - 1 && (
            <View style={{width: 2, height: 30, backgroundColor: 'blue'}} />
          )}
        </View>
        <View>
          <Text style={{fontWeight: 'bold'}}>{event.title}</Text>
          <Text>{event.description}</Text>
        </View>
      </View>
    ))}
  </View>
);

const CActionModal = ({visible, onClose, title, content, actions}) => (
  <Modal transparent={true} visible={visible}>
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}>
      <View style={{padding: 20, backgroundColor: 'white', borderRadius: 10}}>
        {title && (
          <Text style={{fontWeight: 'bold', fontSize: 18}}>{title}</Text>
        )}
        <Text style={{marginVertical: 10}}>{content}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {actions.map((action, index) => (
            <Button key={index} title={action.label} onPress={action.onPress} />
          ))}
        </View>
      </View>
    </View>
  </Modal>
);

const CAccordion = ({title, content}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={{margin: 10}}>
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>{title}</Text>
      </TouchableOpacity>
      {isOpen && <Text style={{marginTop: 10}}>{content}</Text>}
    </View>
  );
};

const CAutoCompleteInput = ({data, placeholder, onSelectItem}) => {
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  //
  // Usage
  // const jsonData = ["Apple", "Banana", "Cherry", "Date", "Grape", "Orange"];

  //   const handleSelect = (item) => {
  //     console.log("Selected Item:", item);
  //   };

  //   return (
  //     <View style={styles.container}>
  //       <AutoCompleteInput
  //         data={jsonData}
  //         placeholder="Type a fruit..."
  //         onSelectItem={handleSelect}
  //       />
  //     </View>
  //   );
  // };

  const handleInputChange = text => {
    setQuery(text);
    if (text) {
      const matches = data.filter(item =>
        item.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredData(matches);
    } else {
      setFilteredData([]);
    }
  };

  const handleSelectItem = item => {
    setQuery(item);
    setFilteredData([]);
    if (onSelectItem) {
      onSelectItem(item);
    }
  };

  return (
    <View style={austyles.container}>
      <TextInput
        style={austyles.input}
        placeholder={placeholder}
        value={query}
        onChangeText={handleInputChange}
      />
      {filteredData.length > 0 && (
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View>
              <TouchableOpacity onPress={() => handleSelectItem(item)}>
                <Text style={austyles.item}>{item}</Text>
              </TouchableOpacity>
            </View>
          )}
          style={austyles.suggestionsList}
        />
      )}
    </View>
  );
};

const austyles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  suggestionsList: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderTopWidth: 0,
    maxHeight: 150,
  },
  item: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});

const CProgressBar = ({
  progress = 0, // Default progress value
  height = 10, // Default height of the progress bar
  color = 'blue', // Default progress color
  backgroundColor = 'gray', // Default background color
}) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100); // Ensure progress is between 0 and 100

  //Usage const App = () => {
  //   const [progress, setProgress] = useState(0);

  //   const incrementProgress = () => {
  //     setProgress(prev => (prev + 10 > 100 ? 100 : prev + 10));
  //   };

  //   const resetProgress = () => {
  //     setProgress(0);
  //   };

  //   return (
  //     <View>
  //       <CProgressBar
  //         progress={progress}
  //         height={15}
  //         color="green"
  //         backgroundColor="#e0e0e0"
  //       />
  //     </View>
  //   );
  // };

  // export default App;

  return (
    <View
      style={[
        progstyles.container,
        {
          height,
          backgroundColor,
          borderRadius: height / 2,
        },
      ]}>
      <View
        style={[
          progstyles.progress,
          {
            width: `${clampedProgress}%`,
            backgroundColor: color,
          },
        ]}
      />
    </View>
  );
};

const progstyles = StyleSheet.create({
  container: {
    width: '100%', // Full width of the parent container
    overflow: 'hidden', // Ensures the progress bar doesn't overflow
  },
  progress: {
    height: '100%', // Matches the height of the parent container
  },
});

const CSearchBar = ({placeholder, onChangeText}) => (
  <View
    style={{
      flexDirection: 'row',
      padding: 10,
      backgroundColor: '#f0f0f0',
      borderRadius: 5,
    }}>
    <TextInput
      placeholder={placeholder}
      onChangeText={onChangeText}
      style={{flex: 1, fontSize: 16}}
    />
  </View>
);

const CDraggable = () => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: () => pan.setValue({x: 0, y: 0}),
  });

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={{
        transform: [{translateX: pan.x}, {translateY: pan.y}],
        backgroundColor: 'blue',
        width: 100,
        height: 100,
      }}
    />
  );
};

const CStepperForm = ({steps}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () =>
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  return (
    <View>
      <Text>{steps[currentStep]}</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <Button title="Back" onPress={prevStep} disabled={currentStep === 0} />
        <Button
          title="Next"
          onPress={nextStep}
          disabled={currentStep === steps.length - 1}
        />
      </View>
    </View>
  );
};
const CDropDown = ({
  options,
  onSelect,
  placeholder = 'Select an option',
  style,
}) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = option => {
    setSelectedOption(option);
    setDropdownVisible(false);
    onSelect(option);
  };

  //  Usage

  // import React from 'react';
  // import { View, StyleSheet } from 'react-native';
  // import {CDropDown} from './custom';

  // const App = () => {
  //   const options = [
  //     { label: 'Option 1', value: '1' },
  //     { label: 'Option 2', value: '2' },
  //     { label: 'Option 3', value: '3' },
  //   ];

  //   const handleSelect = (selectedOption) => {
  //     console.log('Selected option:', selectedOption);
  //   };

  //   return (
  //     <View style={styles.container}>
  //       <CustomDropdown
  //         options={options}
  //         onSelect={handleSelect}
  //         placeholder="Select an option"
  //       />
  //     </View>
  //   );
  // };

  // const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     backgroundColor: '#f0f0f0',
  //   },
  // });

  // export default App;

  return (
    <View style={[dstyles.container, style]}>
      {/* Selected Option */}
      <TouchableOpacity
        style={dstyles.dropdownHeader}
        onPress={() => setDropdownVisible(!isDropdownVisible)}>
        <Text style={dstyles.selectedText}>
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
      </TouchableOpacity>

      {/* Dropdown Options */}
      <Modal
        transparent={true}
        visible={isDropdownVisible}
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}>
        <TouchableOpacity
          style={dstyles.overlay}
          onPress={() => setDropdownVisible(false)}
        />
        <View style={dstyles.dropdown}>
          <FlatList
            data={options}
            keyExtractor={item => item.value.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                style={dstyles.dropdownItem}
                onPress={() => handleSelect(item)}>
                <Text style={dstyles.itemText}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

const dstyles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  dropdownHeader: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  selectedText: {
    fontSize: 16,
    color: '#333',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdown: {
    position: 'absolute',
    top: '50%',
    left: '10%',
    right: '10%',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    maxHeight: 200,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
});

const CSlider = ({
  min = 0,
  max = 100,
  step = 1,
  initialValue = 50,
  sliderWidth = 300,
  sliderHeight = 10,
  sliderColor = '#ddd',
  thumbSize = 20,
  thumbColor = '#3498db',
  onValueChange,
}) => {
  const [value, setValue] = useState(initialValue);
  const [position, setPosition] = useState(
    ((initialValue - min) / (max - min)) * sliderWidth,
  );

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      let newPos = gestureState.dx + position;
      if (newPos < 0) newPos = 0;
      if (newPos > sliderWidth) newPos = sliderWidth;

      const newValue = Math.round(min + ((max - min) * newPos) / sliderWidth);
      if (newValue !== value) {
        setValue(newValue);
        if (onValueChange) onValueChange(newValue);
      }
      setPosition(newPos);
    },
    onPanResponderRelease: () => {
      setPosition(((value - min) / (max - min)) * sliderWidth);
    },
  });

  // Usage Example

  // const App = () => {
  //   const handleValueChange = (newValue) => {
  //     console.log('Slider Value:', newValue);
  //   };

  //   return (
  //     <View style={styles.container}>
  //       <Slider
  //         min={0}
  //         max={100}
  //         step={1}
  //         initialValue={30}
  //         sliderWidth={300}
  //         sliderHeight={8}
  //         sliderColor="#ccc"
  //         thumbSize={24}
  //         thumbColor="#e74c3c"
  //         onValueChange={handleValueChange}
  //       />
  //     </View>
  //   );
  // };

  return (
    <View style={{alignItems: 'center', margin: 20}}>
      <Text style={sliderstyles.valueText}>{value}</Text>
      <View
        style={[
          sliderstyles.slider,
          {
            width: sliderWidth,
            height: sliderHeight,
            backgroundColor: sliderColor,
          },
        ]}>
        <View
          style={[
            sliderstyles.thumb,
            {
              width: thumbSize,
              height: thumbSize,
              borderRadius: thumbSize / 2,
              backgroundColor: thumbColor,
              transform: [{translateX: position - thumbSize / 2}],
            },
          ]}
          {...panResponder.panHandlers}
        />
      </View>
    </View>
  );
};

const sliderstyles = StyleSheet.create({
  slider: {
    position: 'relative',
    borderRadius: 5,
  },
  thumb: {
    position: 'absolute',
    top: -5,
  },
  valueText: {
    fontSize: 18,
    marginBottom: 10,
  },
});
const CSnackbar = ({message}) => {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      {visible && (
        <View
          style={{
            position: 'absolute',
            bottom: 20,
            left: 10,
            right: 10,
            backgroundColor: 'black',
            padding: 10,
            borderRadius: 5,
          }}>
          <Text style={{color: 'white', textAlign: 'center'}}>{message}</Text>
        </View>
      )}
      <Button title="Show Snackbar" onPress={() => setVisible(true)} />
    </View>
  );
};

export {
  CView,
  CViewCenter,
  CFlexCenter,
  CFlexView,
  CAccordion,
  CActionModal,
  CAvatar,
  CBadge,
  CBreadcrumbs,
  CButton,
  CCard,
  CCarousel,
  CCheckbox,
  CChip,
  CDivider,
  CDraggable,
  CExpandableList,
  CFAB,
  CFlatList,
  CImage,
  CImageGrid,
  CInput,
  CInputArea,
  CLink,
  CModal,
  CMultiSelect,
  CNotificationBanner,
  CPagination,
  CProgressBar,
  CRadioButton,
  CRating,
  CSpacer,
  CScrollView,
  CScrollViewFlex,
  CSearchBar,
  CSearchBar2,
  CSnackbar,
  CSpeedDial,
  CSpinner,
  CStepper,
  CStepperForm,
  CStepperProgress,
  CSwitch,
  CTabs,
  CText,
  CTimeline,
  CToast,
  CTooltip,
  CDropDown,
  CSlider,
  CAutoCompleteInput,
  useAPI,
  useFetch,
};
