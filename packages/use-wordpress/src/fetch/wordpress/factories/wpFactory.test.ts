import factory, {
  authorFromWpApi,
  featuredFromWpApi,
  tagFromWpApi,
  tagsFromWpApi,
} from './wpFactory';
import author from './test-data/author';
import mediaItem from './test-data/media';
import tag from './test-data/tag';
import post from './test-data/post';
test('convert wp author', () => {
  const converted = authorFromWpApi(author);
  expect(converted.name).toEqual('Josh Pollock');
  expect(converted.link?.href).toEqual('https://calderaforms.com/author/josh/');
});

test('convert featured', () => {
  const converted = featuredFromWpApi(mediaItem);
  expect(converted.src).toEqual(mediaItem.source_url);
  expect(converted.width).toEqual(2508);
  expect(converted.height).toEqual(1673);
});

test('convert tag', () => {
  //@ts-ignore
  const converted = tagFromWpApi(tag);
  expect(converted.slug).toEqual(tag.slug);
  expect(converted.label).toEqual(tag.name);
});

test('convert tags', () => {
  //@ts-ignore
  const converted = tagsFromWpApi([tag]);
  expect(converted[0].slug).toEqual(tag.slug);
  expect(converted[0].label).toEqual(tag.name);
});

test('factory', () => {
  const getters = {
    author: () => author,
    featured: () => mediaItem,
    tags: () => {
      //@ts-ignore
      return [tag];
    },
    published: () => post.date,
  };
  //@ts-ignore
  const f = factory(getters);
  const data = f.convertPost(post);
  expect(data).toMatchSnapshot();
});

test('factory deals with featured image being 0', () => {
  const fail = true;
  const getters = {
    author: () => author,
    featured: () => {
      return new Promise((resolve, reject) => {
        if (fail) {
          reject();
        }
        resolve();
      });
    },
    tags: () => {
      //@ts-ignore
      return [tag];
    },
    published: () => post.date,
  };
  //@ts-ignore
  const f = factory(getters);
  const data = f.convertPost(post);
  expect(data).toMatchSnapshot();
});
