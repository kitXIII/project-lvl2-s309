import _ from 'lodash';

const buildDiff = (object1, object2) => {
  const genDiffByKey = (key, obj1, obj2) => {
    if (!_.has(obj1, key)) {
      return { status: 'added', key, value: obj2[key] };
    }

    if (!_.has(obj2, key)) {
      return { status: 'removed', key, value: obj1[key] };
    }

    if (obj1[key] instanceof Object && obj2[key] instanceof Object) {
      const diff = buildDiff(obj1[key], obj2[key]);
      return { status: 'internal', key, children: diff };
    }

    if (obj1[key] === obj2[key]) {
      return { status: 'unchanged', key, value: obj1[key] };
    }

    return {
      status: 'changed',
      key,
      value: obj2[key],
      oldValue: obj1[key],
    };
  };

  const keys = _.union(_.keys(object1), _.keys(object2));
  return keys.reduce((acc, key) => [...acc, genDiffByKey(key, object1, object2)], []);
};

export default buildDiff;
