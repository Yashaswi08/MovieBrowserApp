import React from 'react';
import {Alert, FlatList, Text, View} from 'react-native';
import {fetch_movies, now_playing, search_movies} from '../shared/functions';
import {
  CardUI,
  CarouselCardUI,
  CategoryBox,
  SearchBox,
  SmallCardUI,
} from '../others/Reusables';
import {useAppTheme} from '../shared/appTheme';
import {FlashList} from '@shopify/flash-list';
import {HomeTabContext, IMAGE_URL} from '../shared/constants';
import {useAppDispatch, useAppSelector} from '../shared/hooks';
import {updatePageNumber} from '../shared/redxSlice';
import {ActivityIndicator} from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const HomeTab = React.memo((props: any) => {
  const [movieList, setMovieList] = React.useState([]);
  const [nowPlayingmovieList, setNowPlayingmovieList] = React.useState([]);
  const [currentType, setCurrentType] = React.useState({});
  const [loading, setLoading] = React.useState<boolean>(false);

  const theme = useAppTheme('', '');
  const dispatch = useAppDispatch();
  const currentMoviePage = useAppSelector(state => state.main.page);
  const searchValue = useAppSelector(state => state.main.searchValue);

  const get_movies = React.useCallback(
    async (page?: number) => {
      setLoading(true);
      const req_page = page ?? currentMoviePage;
      const request = await fetch_movies(req_page);
      if (request == undefined)
        return Alert.alert('Error', 'An error occured while fetching movies');
      console.log('request', request.results.length);
      if (page == undefined || page == 1) {
        setMovieList([]);
        setTimeout(() => {
          setMovieList(request.results);
        }, 500);
      } else {
        const all_movies = [...movieList, ...request.results] as any;
        setMovieList(all_movies);
      }
      dispatch(updatePageNumber(request.page));
      setLoading(false);
    },
    [currentMoviePage, movieList],
  );

  const get_now_playings = React.useCallback(
    async (props: any, page?: number) => {
      setLoading(true);
      const request = await now_playing(props?.key, page);
      setCurrentType(props);
      if (request == undefined)
        return Alert.alert('Error', 'An error occured while fetching movies');
      console.log('request', request.results.length);
      if (page == undefined || page == 1) {
        setNowPlayingmovieList([]);
        setTimeout(() => {
          setNowPlayingmovieList(request.results);
        }, 500);
      } else {
        const all_movies = [...nowPlayingmovieList, ...request.results] as any;
        setNowPlayingmovieList(all_movies);
      }
      dispatch(updatePageNumber(request.page));
      setLoading(false);
    },
    [currentMoviePage, nowPlayingmovieList],
  );

  React.useLayoutEffect(() => {
    get_movies();
    // get_now_playings();
  }, []);

  const handleLoadMoreMovies = React.useCallback(() => {
    const item = currentType;
    // console.log('item--->>>', currentType);
    get_now_playings(item, currentMoviePage + 1);
  }, [currentMoviePage, searchValue, currentType]);

  const handleRouteToDetailsPage = React.useCallback((movie_id: number) => {
    props.navigation.navigate('movieDetails', {movie_id});
  }, []);

  const handleRouteToSearchPage = React.useCallback(() => {
    props.navigation.navigate('Search');
  }, []);

  return (
    <HomeTabContext.Provider value={{}}>
      <View style={{flex: 1, backgroundColor: theme.appBackground}}>
        {loading ? (
          <View
            style={{
              position: 'absolute',
              width: widthPercentageToDP('70%'),
              paddingVertical: widthPercentageToDP('5%'),
              marginTop: heightPercentageToDP('30%'),
              zIndex: 3,
              // marginBottom: 'auto',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: theme.cardBackground,
              alignSelf: 'center',
              borderRadius: 10,
            }}>
            <ActivityIndicator size={50} />
            <Text
              style={{
                color: theme.inverseBlack,
                paddingHorizontal: widthPercentageToDP('1%'),
              }}>
              Loading...
            </Text>
          </View>
        ) : (
          <></>
        )}
        <SearchBox editable={true} onPress={handleRouteToSearchPage} />
        <View style={{minHeight: 2, marginHorizontal: 15}}>
          <FlatList
            data={movieList}
            horizontal={true}
            // numColumns={2}
            renderItem={({item}: {item: any}) => (
              <CarouselCardUI
                image={IMAGE_URL + item.backdrop_path}
                movie_id={item.id}
                title={item.title}
                release_date={item?.release_date}
                desc={
                  item.overview.length <= 130
                    ? item.overview.slice(0, 130)
                    : item.overview.slice(0, 130) + '...'
                }
                handleRouteToDetailsPage={handleRouteToDetailsPage}
              />
            )}
            onEndReachedThreshold={0}
            // @ts-ignore
            keyExtractor={item => item.id}
            contentContainerStyle={{
              paddingEnd: '200%',
            }}
          />
        </View>

        <View style={{}}>
          <CategoryBox onPress={get_now_playings} />
        </View>
        <FlatList
          data={nowPlayingmovieList}
          numColumns={2}
          renderItem={({item}: {item: any}) => {
            return (
              <SmallCardUI
                image={IMAGE_URL + item.backdrop_path}
                movie_id={item.id}
                title={item.title}
                release_date={item?.release_date}
                vote_average={item?.vote_average}
                desc={
                  item.overview.length <= 130
                    ? item.overview.slice(0, 130)
                    : item.overview.slice(0, 130) + '...'
                }
                handleRouteToDetailsPage={handleRouteToDetailsPage}
              />
            );
          }}
          onEndReached={handleLoadMoreMovies}
          onEndReachedThreshold={0}
          // @ts-ignore
          keyExtractor={item => item.id}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingVertical: 0,
          }}
        />
      </View>
    </HomeTabContext.Provider>
  );
});

export default HomeTab;
