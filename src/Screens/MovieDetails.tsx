import React from 'react';
import {Alert, View, Image, ActivityIndicator, Linking} from 'react-native';
import {useAppTheme} from '../components/shared/appTheme';
import {movie_detail} from '../components/shared/functions';
import {FlashList} from '@shopify/flash-list';
import {Text} from 'react-native-paper';
import {IMAGE_URL} from '../components/shared/constants';
import {TProductionCompanies} from '../components/shared/types';
import {Link} from 'iconsax-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import RatingIcon from '../assets/icons/ratingIcon';

const MovieDetails = React.memo((props: any) => {
  const theme = useAppTheme();
  const movie_id = props.route.params.movie_id;
  const [movieDetail, setMovieDetails] = React.useState<any>({});
  const [loading, setLoading] = React.useState<boolean>(false);

  const fetch_details = React.useCallback(async () => {
    setLoading(true);
    const request = await movie_detail(movie_id);
    setLoading(false);
    if (request == undefined) {
      Alert.alert('Error Fetching', 'Could not fetch movie details');
      return props.navigation.goBack();
    }
    console.log(request);
    setMovieDetails(request);
  }, []);

  React.useLayoutEffect(() => {
    console.log('movie_id:', movie_id);
    fetch_details();
    props.navigation.setOptions({
      headerStyle: {
        backgroundColor: theme.appBackground,
      },
      headerTitleStyle: {
        color: theme.inverseBlack,
      },
    });
  }, []);

  const MakeSpokenLanguages = React.memo(() => {
    return (
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        <Text style={{fontWeight: 'bold', color: theme.inverseBlack}}>
          Spoken Languages:{' '}
        </Text>
        {movieDetail.spoken_languages.map(
          (language: {
            english_name: string;
            iso_639_1: string;
            name: string;
          }) => (
            <Text
              style={{marginRight: 10, color: theme.gray}}
              key={language.iso_639_1}>
              {language.name}
            </Text>
          ),
        )}
      </View>
    );
  });

  const MakeProductionCountries = React.memo(() => {
    return (
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        <Text style={{fontWeight: 'bold', color: theme.inverseBlack}}>
          Production Countries:{' '}
        </Text>
        {movieDetail.production_countries.map(
          (countries: {iso_3166_1: string; name: string}) => (
            <Text
              style={{marginRight: 10, color: theme.inverseBlack}}
              key={countries.iso_3166_1}>
              {countries.name}
            </Text>
          ),
        )}
      </View>
    );
  });

  const MakeGenres = React.memo(() => {
    return (
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        <Text style={{fontWeight: 'bold', color: theme.inverseBlack}}>
          Genres:{' '}
        </Text>
        {movieDetail.genres.map((genre: {id: number; name: string}) => (
          <Text style={{marginRight: 10, color: theme.gray}} key={genre.id}>
            {genre.name}
          </Text>
        ))}
      </View>
    );
  });

  const MakeProductionCompanies = React.memo(() => {
    return (
      <View>
        <View style={{marginBottom: 5}}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: theme.inverseBlack,
            }}>
            Production Companies
          </Text>
        </View>
        {movieDetail.production_companies.map((comp: TProductionCompanies) => (
          <View style={{flexDirection: 'row', marginBottom: 5}} key={comp.id}>
            <View style={{marginRight: 10, backgroundColor: 'lightgray'}}>
              <Image
                source={{uri: IMAGE_URL + comp.logo_path}}
                width={40}
                height={40}
                resizeMode="contain"
              />
            </View>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: theme.inverseBlack,
                }}>
                {comp.name}
              </Text>
              <Text style={{color: theme.gray}}>{comp.origin_country}</Text>
            </View>
          </View>
        ))}
      </View>
    );
  });

  return (
    <View style={{flex: 1, backgroundColor: theme.appBackground}}>
      {loading ? (
        <View
          style={{
            width: '100%',
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size={30} />
          <Text style={{color: theme.inverseBlack}}>Loading...</Text>
        </View>
      ) : (
        <FlashList
          data={[{}]}
          contentContainerStyle={{paddingBottom: 25}}
          renderItem={() => (
            <View
              style={{
                alignItems: 'center',
                padding: wp('5%'),
                elevation: 3,
              }}>
              <Image
                source={{uri: IMAGE_URL + movieDetail.backdrop_path}}
                style={{
                  width: wp('90%'),
                  height: hp('30%'),
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}
              />

              <View
                style={{
                  paddingHorizontal: wp('5%'),
                  backgroundColor: theme.cardBackground,
                  //   borderWidth: 2,
                  //   borderColor: '#000000',
                  //   elevation: 1,
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  padding: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    variant="titleLarge"
                    style={{fontWeight: 'bold', color: theme.inverseBlack}}>
                    {movieDetail.title}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      //   paddingVertical: 2,
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
                      {Math.round(movieDetail?.vote_average * 10) / 10}
                    </Text>
                  </View>
                </View>

                <View>
                  <Text
                    variant="titleMedium"
                    style={{color: theme.gray, paddingBottom: hp('1.5%')}}>
                    {movieDetail.tagline}
                  </Text>
                </View>

                <View>
                  <MakeGenres />
                </View>

                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                  <Text style={{fontWeight: 'bold', color: theme.inverseBlack}}>
                    Released On:{' '}
                  </Text>
                  <Text style={{color: theme.gray}}>
                    {movieDetail.release_date}
                  </Text>
                </View>

                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                  <Text style={{fontWeight: 'bold', color: theme.inverseBlack}}>
                    Vote Count:{' '}
                  </Text>
                  <Text style={{color: theme.gray}}>
                    {movieDetail.vote_count} votes
                  </Text>
                </View>

                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                  <Text style={{fontWeight: 'bold', color: theme.inverseBlack}}>
                    Revenue:{' '}
                  </Text>
                  <Text style={{color: theme.gray}}>
                    {movieDetail.revenue} USD
                  </Text>
                </View>

                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                  <MakeProductionCountries />
                </View>

                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                  <MakeSpokenLanguages />
                </View>

                <View style={{marginTop: 10}}>
                  <MakeProductionCompanies />
                </View>

                <View style={{marginTop: 10}}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: theme.inverseBlack,
                    }}>
                    Overview
                  </Text>
                  <Text style={{color: theme.gray}}>
                    {movieDetail.overview}
                  </Text>
                </View>

                <View
                  style={{marginTop: 10, flexDirection: 'row'}}
                  onTouchEnd={() => Linking.openURL(movieDetail.homepage)}>
                  <Text style={{color: theme.link, marginRight: 5}}>
                    View movie home page
                  </Text>
                  <Link size="20" color={theme.link} />
                </View>
              </View>
            </View>
          )}
          estimatedItemSize={1}
        />
      )}
    </View>
  );
});

export default MovieDetails;
