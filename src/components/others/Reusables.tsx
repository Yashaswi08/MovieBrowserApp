import React, {useEffect} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {useAppTheme} from '../shared/appTheme';
import {useAppDispatch, useAppSelector} from '../shared/hooks';
import {updateSearchValue} from '../shared/redxSlice';
import {TextInput} from 'react-native';
import SearchIcon from '../../assets/icons/searchIcon';
import {ScrollView} from 'react-native';
import moment from 'moment';
import RatingIcon from '../../assets/icons/ratingIcon';
import CalenderIcon from '../../assets/icons/calenderIcon';

export const CardUI = React.memo((props: any) => {
  const theme = useAppTheme();
  return (
    <Card
      style={{marginBottom: 10, marginTop: 10, elevation: 3}}
      onPress={() => props.handleRouteToDetailsPage(props.movie_id)}>
      <Card.Cover
        source={{uri: props.image}}
        style={{borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}
      />
      <Card.Content style={{backgroundColor: theme.appBackground}}>
        <Text variant="titleLarge" style={{color: theme.inverseBlack}}>
          {props.title}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 2,
            justifyContent: 'center',
          }}>
          <RatingIcon />
          <Text
            style={{
              color: theme.inverseBlack,
              paddingHorizontal: 3,
              // marginLeft: 'auto',
              // marginRight: 'auto',
            }}>
            {Math.round(props?.vote_average * 10) / 10}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 2,
            justifyContent: 'center',
          }}>
          <CalenderIcon />
          <Text
            style={{
              color: theme.inverseBlack,
              paddingHorizontal: 3,
              // marginLeft: 'auto',
              // marginRight: 'auto',
            }}>
            {moment(props.release_date).format('LL')}
          </Text>
        </View>
        {/* <Text variant="bodyMedium" style={{color: theme.gray}}>
          {props.desc}
        </Text> */}
      </Card.Content>
    </Card>
  );
});

export const SearchBox = React.memo((props: any) => {
  // const [searchValue, setSearchValue] = React.useState<string>('')
  const theme = useAppTheme();
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector(state => state.main.searchValue);
  console.log('theme', theme);

  return (
    <View
      style={{
        marginBottom: 10,
        marginVertical: 10,
        flexDirection: 'row',
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: theme.gray,
        alignItems: 'center',
        marginHorizontal: 15,
        elevation: 3,
        backgroundColor: theme.appBackground,
      }}>
      <View style={{padding: 10}}>
        <SearchIcon color={theme.inverseBlack} />
      </View>

      <TextInput
        // label="Search movies..."
        placeholder="Search movies..."
        placeholderTextColor={theme.gray}
        value={searchValue}
        editable={props.editable}
        onPressIn={() => props.onPress?.()}
        onChangeText={text => {
          dispatch(updateSearchValue(text));
          props.onSubmitEditing();
        }}
        style={{
          color: theme.gray,
        }}
        onSubmitEditing={() => props.onSubmitEditing()}
      />
    </View>
  );
});

export const CategoryBox = React.memo((props: any) => {
  // const [value, setValue] = React.useState<string>('Now Playing');
  const [value, setValue] = React.useState<any>({
    key: 'now_playing',
    value: 'Now Playing',
  });
  const theme = useAppTheme();
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector(state => state.main.searchValue);
  console.log('theme', theme);

  useEffect(() => {
    console.log('value', value);
    props.onPress(value, 1);
  }, []);

  const data = [
    {
      key: 'now_playing',
      value: 'Now Playing',
    },
    {
      key: 'popular',
      value: 'Popular',
    },
    {
      key: 'top_rated',
      value: 'Top Rated',
    },
    {
      key: 'upcoming',
      value: 'Upcoming',
    },
  ];

  return (
    <View style={{alignItems: 'center', marginVertical: 10, elevation: 3}}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{flexDirection: 'row'}}>
        {data.map(item => (
          <TouchableOpacity
            onPress={() => {
              setValue(item);
              props.onPress(item, 1);
            }}
            key={item.key}
            style={{
              borderBottomWidth: 4,
              padding: 0,
              flex: 1,
              marginHorizontal: 15,
              paddingBottom: 8,
              justifyContent: 'center',
              alignItems: 'center',
              borderColor:
                item?.value == value.value ? '#3A3F47' : 'transparent',
            }}>
            <Text
              style={{
                color: theme.inverseBlack,
                fontSize: 14,
                // fontWeight: 'bold',
                elevation: 3,
              }}>
              {item?.value}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
});

export const SmallCardUI = React.memo((props: any) => {
  const theme = useAppTheme();
  return (
    <TouchableOpacity
      onPress={() => props.handleRouteToDetailsPage(props.movie_id)}
      style={{marginHorizontal: 10, flex: 1, marginVertical: 10, elevation: 3}}>
      <Image
        height={200}
        // width={200}
        source={{uri: props.image}}
        style={{borderTopLeftRadius: 10, borderTopRightRadius: 10}}
      />
      <View
        style={{
          backgroundColor: theme.cardBackground,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}>
        <Text
          style={{
            color: theme.inverseBlack,
            // marginTop: -30,
            paddingHorizontal: 10,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
          {props.title}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 2,
            justifyContent: 'center',
          }}>
          <RatingIcon />
          <Text
            style={{
              color: theme.inverseBlack,
              paddingHorizontal: 3,
              // marginLeft: 'auto',
              // marginRight: 'auto',
            }}>
            {Math.round(props?.vote_average * 10) / 10}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 2,
            justifyContent: 'center',
          }}>
          <CalenderIcon />
          <Text
            style={{
              color: theme.inverseBlack,
              paddingHorizontal: 3,
              // marginLeft: 'auto',
              // marginRight: 'auto',
            }}>
            {moment(props.release_date).format('LL')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

export const CarouselCardUI = React.memo((props: any) => {
  const theme = useAppTheme();
  return (
    <TouchableOpacity
      onPress={() => props.handleRouteToDetailsPage(props.movie_id)}
      style={{marginHorizontal: 10, minWidth: '5%', elevation: 3}}>
      <Image
        height={200}
        source={{uri: props.image}}
        style={{borderRadius: 10}}
      />
      <Text
        style={{
          color: theme.inverseBlack,
          // marginTop: -30,
          padding: 10,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
});
