import { faker } from "@faker-js/faker";
import { defineEventHandler, getQuery } from "h3";

export default defineEventHandler((event) => {
  const query = getQuery(event);
  let width = Number(query?.width) || 1000;
  let height = Number(query?.height || query?.width) || 1000;

  const gen = () => {
    return {
      title: faker.internet.emoji(),
      src: faker.image.urlPicsumPhotos({
        width,
        height,
      }),
      placeholder: faker.image.urlPicsumPhotos({
        width: 10,
        height: 10,
      }),
    };
  };

  let images = faker.helpers.multiple(gen, { count: 600 });
  const offset = Number(query?.offset) || 0;
  const limit = Number(query?.limit) || 600;
  images = images.slice(offset, offset + limit);

  return {
    images,
  };
});
