import { faker } from "@faker-js/faker";
import { defineEventHandler, getQuery } from "h3";

export default defineEventHandler((event) => {
  const query = getQuery(event);
  let width = Number(query?.width) || 1000;
  let height = Number(query?.height || query?.width) || 1000;

  
  let images = Array.from(Array(600)).map((_, index) => {
    const id = index + 1
    return {
      id,
      title: faker.internet.emoji(),
      // 為了讓 blur, 正規圖片相同，將 faker.image.urlPicsumPhotos 改為 picsum.photos/seed/
      src: `https://picsum.photos/seed/${id}/${width}/${height}.webp`,

      // @@todo 可改寫為 base64 減少 API request 次數
      placeholder: `https://picsum.photos/seed/${id}/10/10.webp`,
    }
  })

  // @@todo 若大量資料時，slice 寫法可優化
  const limit = Number(query?.limit) || 600;
  const offset = (Number(query?.offset) || 0) * limit;
  images = images.slice(offset, offset + limit);

  return {
    images,
  };
});
