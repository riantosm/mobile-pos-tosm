import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
//import { fonts as f, colors as c } from '../../../styles'
import {useDispatch, useSelector} from 'react-redux';
import {
  deleteCategory,
  getAllCategory,
  loadDeleted,
  loadMore,
  loadRefresh,
  loadSearch,
  loadSort,
  setFormAdd,
  setFormEdit,
} from '../../../../redux/actions/Category';

const ListCategory = ({navigation}) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('desc');
  const [sortBy, setSortBy] = useState('_id');

  const {
    category,
    isLoaded,
    isLoadMore,
    isLoadSort,
    isLoadSearch,
    isLoadRefresh,
    isLoadDeleted,
  } = useSelector(state => state.categoryReducers);
  const dispatch = useDispatch();

  const handleLoadMore = () => {
    dispatch(loadMore());
    let searchUrl = search === '' ? null : search;
    let searchByUrl = search === '' ? null : 'name_category';
    dispatch(
      getAllCategory(10 * (page + 1), 1, sort, sortBy, searchUrl, searchByUrl),
    );
    setPage(page + 1);
  };

  const handleOnRefresh = () => {
    dispatch(loadRefresh());
    let searchUrl = search === '' ? null : search;
    let searchByUrl = search === '' ? null : 'name_category';
    dispatch(
      getAllCategory(10 * page, 1, sort, sortBy, searchUrl, searchByUrl),
    );
  };

  const handleSearch = () => {
    dispatch(loadSearch());
    setPage(1);
    dispatch(getAllCategory(10 * 1, 1, sort, sortBy, search, 'name_category'));
  };

  const handleSort = () => {
    dispatch(loadSort());
    let searchUrl = search === '' ? null : search;
    let searchByUrl = search === '' ? null : 'name_category';
    dispatch(
      getAllCategory(10 * page, 1, sort, sortBy, searchUrl, searchByUrl),
    );
  };

  const handleDelete = item => {
    dispatch(loadDeleted());
    dispatch(deleteCategory(item));
  };

  const renderComp = (item, index) => {
    return (
      <View style={s.row}>
        <Text>{index + 1}</Text>
        <Text>{item.name_category}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('FormCategory', ['Edit']);
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
          category.length !== 0 &&
          (((category.length / page) ^ 10) === 0 && (
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
      <Text>ListCategory</Text>
      <TextInput
        placeholder={'Search name category'}
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
          navigation.navigate('FormCategory', ['Add']);
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
            setSortBy(sortBy !== 'name_category' ? 'name_category' : '_id')
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
        data={category}
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
  btnText: {paddingLeft: 20, padding: 55},
});

export default ListCategory;
