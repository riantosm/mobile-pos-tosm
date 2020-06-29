import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
//import { fonts as f, colors as c } from '../../../styles'
import {useDispatch, useSelector} from 'react-redux';
import {
  getAllProduct,
  loadMore,
  loadRefresh,
  loadSearch,
  loadSort,
  loadDeleted,
  setFormAdd,
  setFormEdit,
  deleteProduct,
} from '../../../../redux/actions/Product';
import {default_food} from '../../../../assets';

const ListProduct = ({navigation}) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('asc');
  const [sortBy, setSortBy] = useState('_id');

  const {
    product,
    isLoaded,
    isLoadMore,
    isLoadSort,
    isLoadSearch,
    isLoadRefresh,
    isLoadDeleted,
  } = useSelector(state => state.productReducers);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(product);
  });

  const handleDelete = item => {
    dispatch(loadDeleted());
    dispatch(deleteProduct(item));
  };

  const handleLoadMore = () => {
    dispatch(loadMore());
    let searchUrl = search === '' ? null : search;
    let searchByUrl = search === '' ? null : 'name_product';
    dispatch(
      getAllProduct(10 * (page + 1), 1, sort, sortBy, searchUrl, searchByUrl),
    );
    setPage(page + 1);
  };

  const handleOnRefresh = () => {
    dispatch(loadRefresh());
    let searchUrl = search === '' ? null : search;
    let searchByUrl = search === '' ? null : 'name_product';
    dispatch(getAllProduct(10 * page, 1, sort, sortBy, searchUrl, searchByUrl));
  };

  const handleSearch = () => {
    dispatch(loadSearch());
    setPage(1);
    dispatch(getAllProduct(10 * 1, 1, sort, sortBy, search, 'name_product'));
  };

  const handleSort = () => {
    dispatch(loadSort());
    let searchUrl = search === '' ? null : search;
    let searchByUrl = search === '' ? null : 'name_product';
    dispatch(getAllProduct(10 * page, 1, sort, sortBy, searchUrl, searchByUrl));
  };

  const renderComp = (item, index) => {
    return (
      <View style={s.row}>
        <Text>{index + 1}</Text>
        <Image
          source={item.image === null ? default_food : {uri: item.image}}
          style={s.imgProduct}
        />
        <Text>{item.name_product}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('FormProduct', ['Edit']);
            dispatch(setFormEdit(item));
          }}>
          <Text style={s.btnText}>Edit</Text>
        </TouchableOpacity>
        {isLoadDeleted ? (
          <ActivityIndicator
            size="large"
            color={'#000'}
            style={{marginBottom: 10}}
          />
        ) : (
          <TouchableOpacity onPress={() => handleDelete(item)}>
            <Text style={s.btnText}>Delete</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View>
        {isLoadMore ? (
          <ActivityIndicator
            size="large"
            color={'#000'}
            style={{marginBottom: 10}}
          />
        ) : (
          product.length !== 0 &&
          (((product.length / page) ^ 10) === 0 && (
            <TouchableOpacity onPress={() => handleLoadMore()}>
              <Text style={{padding: 20}}>Load more</Text>
            </TouchableOpacity>
          ))
        )}
      </View>
    );
  };

  return (
    <View style={s.container}>
      <Text>ListProduct</Text>
      <TextInput
        placeholder={'Search name product'}
        value={search}
        onChangeText={value => setSearch(value)}
      />
      {isLoadSearch ? (
        <ActivityIndicator
          size="large"
          color={'#000'}
          style={{marginBottom: 10}}
        />
      ) : (
        <TouchableOpacity onPress={() => handleSearch()}>
          <Text style={{padding: 20}}>Search</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('FormProduct', ['Add']);
          dispatch(setFormAdd());
        }}>
        <Text style={{padding: 20}}>add</Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => setSort(sort !== 'desc' ? 'desc' : 'asc')}>
          <Text style={{padding: 20}}>
            {sort === 'asc' ? <>Data ^</> : <>Data v</>}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            setSortBy(sortBy !== 'name_product' ? 'name_product' : '_id')
          }>
          <Text style={{padding: 20}}>{sortBy}</Text>
        </TouchableOpacity>
        {isLoadSort ? (
          <ActivityIndicator
            size="large"
            color={'#000'}
            style={{marginBottom: 10}}
          />
        ) : (
          <TouchableOpacity onPress={() => handleSort()}>
            <Text style={{padding: 20}}>Submit</Text>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={product}
        renderItem={({item, index}) => renderComp(item, index)}
        keyExtractor={item => item._id}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={isLoadRefresh}
            onRefresh={handleOnRefresh}
          />
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View>{isLoaded ? <Text>Loading</Text> : <Text>No data</Text>}</View>
        )}
      />
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imgProduct: {width: 50, height: 50},
  btnText: {paddingLeft: 20, padding: 55},
});

export default ListProduct;
