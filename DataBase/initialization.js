var mysql = require("mysql2");
var path = require("path");
const conDB = require("./connectToDB");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") }); // בדיקת טעינת המשתנים הסביבתיים

async function initializeDB() {
  // הכנסת נתונים התחלתיים לטבלת users
  const insertUsers = `
  INSERT INTO users (id, name, email) VALUES
  ('Leanne Graham', 'Sincere@april.biz'),
  ('Ervin Howell', 'Shanna@melissa.tv'),
  ('Clementine Bauch', 'Nathan@yesenia.net'),
  ('Patricia Lebsack', 'Julianne.OConner@kory.org'),
  ('Chelsey Dietrich', 'Lucio_Hettinger@annie.ca')
   `;


  // הכנסת נתונים התחלתיים לטבלת donations
  const insertPosts =`INSERT INTO posts (id, userId, title, body) VALUES
  (1, 1, "sunt aut facere repellat provident occaecati excepturi optio reprehenderit", "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"),
  (2, 1, "qui est esse", "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"),
  (3, 1, "ea molestias quasi exercitationem repellat qui ipsa sit aut", "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"),
  
  (4, 2, "et ea vero quia laudantium autem", "delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus\naccusamus in eum beatae sit\nvel qui neque voluptates ut commodi qui incidunt\nut animi commodi"),
  (5, 2, "in quibusdam tempore odit est dolorem", "itaque id aut magnam\npraesentium quia et ea odit et ea voluptas et\nsapiente quia nihil amet occaecati quia id voluptatem\nincidunt ea est distinctio odio"),
  (6, 2, "dolorum ut in voluptas mollitia et saepe quo animi", "aut dicta possimus sint mollitia voluptas commodi quo doloremque\niste corrupti reiciendis voluptatem eius rerum\nsit cumque quod eligendi laborum minima\nperferendis recusandae assumenda consectetur porro architecto ipsum ipsam"),
  
  (7, 3, "asperiores ea ipsam voluptatibus modi minima quia sint", "repellat aliquid praesentium dolorem quo\nsed totam minus non itaque\nnihil labore molestiae sunt dolor eveniet hic recusandae veniam\ntempora et tenetur expedita sunt"),
  (8, 3, "dolor sint quo a velit explicabo quia nam", "eos qui et ipsum ipsam suscipit aut\nsed omnis non odio\nexpedita earum mollitia molestiae aut atque rem suscipit\nnam impedit esse"),
  (9, 3, "maxime id vitae nihil numquam", "veritatis unde neque eligendi\nquae quod architecto quo neque vitae\nest illo sit tempora doloremque fugit quod\net et vel beatae sequi ullam sed tenetur perspiciatis"),
  
  (10, 4, "ullam ut quidem id aut vel consequuntur", "debitis eius sed quibusdam non quis consectetur vitae\nimpedit ut qui consequatur sed aut in\nquidem sit nostrum et maiores adipisci atque\nquaerat voluptatem adipisci repudiandae"),
  (11, 4, "doloremque illum aliquid sunt", "deserunt eos nobis asperiores et hic\nest debitis repellat molestiae optio\nnihil ratione ut eos beatae quibusdam distinctio maiores\nearum voluptates et aut adipisci ea maiores voluptas maxime"),
  (12, 4, "qui explicabo molestiae dolorem", "rerum ut et numquam laborum odit est sit\nid qui sint in\nquasi tenetur tempore aperiam et quaerat qui in\nrerum officiis sequi cumque quod"),
  
  (13, 5, "quia et eligendi sed sunt", "sit totam eius qui reiciendis soluta\nsoluta iusto veritatis sunt\nomnis ullam placeat vel minima\nnihil sunt deserunt ullam"),
  (14, 5, "voluptatem doloremque aut mollitia consequatur", "consequuntur vero doloribus molestias\nvoluptatem facere officia et\nsunt adipisci dolores sequi deserunt\nreprehenderit quo rerum sit"),
  (15, 5, "adipisci vel non praesentium", "quae est sint mollitia\nut aut accusantium quae\nrerum itaque minus similique\nsint enim voluptas laborum");
  `;


  
  const insertComments = `
  INSERT INTO comments (id, postId, name, email, body) VALUES
  
  (1, 1, "Leanne Graham", "Sincere@april.biz", "This is an amazing post! I really enjoyed reading it."),
  (2, 1, "Ervin Howell", "Shanna@melissa.tv", "I have a few questions about the topic you mentioned. Could you elaborate?"),
  
  (3, 2, "Clementine Bauch", "Nathan@yesenia.net", "Great insights! I'm curious about the second point you raised."),
  (4, 2, "Patricia Lebsack", "Julianne.OConner@kory.org", "I completely agree with your perspective. Keep up the good work!"),
  
  (5, 3, "Chelsey Dietrich", "Lucio_Hettinger@annie.ca", "Very informative post! I'd love to see more content like this."),
  (6, 3, "Leanne Graham", "Sincere@april.biz", "This is an interesting take on the subject. Looking forward to your next post."),
  
  (7, 4, "Ervin Howell", "Shanna@melissa.tv", "I think there are some great points here, but I disagree with the conclusion."),
  (8, 4, "Clementine Bauch", "Nathan@yesenia.net", "This post brings up some thought-provoking ideas. I would like to hear more about this."),
  
  (9, 5, "Patricia Lebsack", "Julianne.OConner@kory.org", "The writing style is excellent, but I think the topic could be explored further."),
  (10, 5, "Chelsey Dietrich", "Lucio_Hettinger@annie.ca", "I enjoyed this post, but I think there could be more examples to support the points."),
  
  (11, 6, "Leanne Graham", "Sincere@april.biz", "Your post is really engaging! I liked the way you broke down the information."),
  (12, 6, "Ervin Howell", "Shanna@melissa.tv", "Interesting read! I would love to know your thoughts on some related topics."),
  
  (13, 7, "Clementine Bauch", "Nathan@yesenia.net", "I found this post very insightful. You've tackled a challenging subject with ease."),
  (14, 7, "Patricia Lebsack", "Julianne.OConner@kory.org", "The examples were very helpful, but I would love to see some case studies."),
  
  (15, 8, "Chelsey Dietrich", "Lucio_Hettinger@annie.ca", "This post was a great introduction to the topic. I learned a lot!"),
  (16, 8, "Leanne Graham", "Sincere@april.biz", "I think you could dive deeper into some of the issues raised in this post.");
  `;

  const insertTodo = `
  INSERT INTO todo (id, userId, title, completed) VALUES
  
  (1, 1, 'Finish homework', false),
  (2, 1, 'Go for a run', true),
  (3, 1, 'Read a book', false),
  
  (4, 2, 'Buy groceries', true),
  (5, 2, 'Clean the house', false),
  (6, 2, 'Pay bills', true),
  
  (7, 3, 'Write an article', true),
  (8, 3, 'Call mom', false),
  (9, 3, 'Take a walk', true),
  
  (10, 4, 'Prepare a presentation', false),
  (11, 4, 'Attend meeting', true),
  (12, 4, 'Update website', false),
  
  (13, 5, 'Complete project', true),
  (14, 5, 'Go to the gym', false),
  (15, 5, 'Check emails', true);
  `;
  
  const insertAlbums = `
  INSERT INTO albums (id, userId, title) VALUES
  
  (1, 1, 'Summer Vibes'),
  (2, 1, 'Weekend Fun'),
  
  (3, 2, 'City Life'),
  (4, 2, 'Family Moments'),
  
  (5, 3, 'Vacation Time'),
  (6, 3, 'Night Out'),
  
  (7, 4, 'Adventure Awaits'),
  (8, 4, 'Chill Moments'),
  
  (9, 5, 'Foodie Diaries'),
  (10, 5, 'Friends Forever');
  `;
  
  const insertPhotos = `
  INSERT INTO photos (id, albumId, title, url) VALUES
  
  (1, 1, 'Sunset at the Beach', 'https://example.com/photo1.jpg'),
  (2, 1, 'Chilling by the Water', 'https://example.com/photo2.jpg'),
  (3, 1, 'Palm Trees Vibe', 'https://example.com/photo3.jpg'),
  
  (4, 2, 'Park Picnic', 'https://example.com/photo4.jpg'),
  (5, 2, 'Coffee and Friends', 'https://example.com/photo5.jpg'),
  (6, 2, 'Street Market Finds', 'https://example.com/photo6.jpg'),
  
  (7, 3, 'Skyscraper Views', 'https://example.com/photo7.jpg'),
  (8, 3, 'Rooftop Hangout', 'https://example.com/photo8.jpg'),
  (9, 3, 'Cafe Moments', 'https://example.com/photo9.jpg'),
  
  (10, 4, 'Hiking in the Mountains', 'https://example.com/photo10.jpg'),
  (11, 4, 'Sunrise Over the Valley', 'https://example.com/photo11.jpg'),
  (12, 4, 'Exploring Nature', 'https://example.com/photo12.jpg'),
  
  (13, 5, 'Delicious Brunch', 'https://example.com/photo13.jpg'),
  (14, 5, 'Sushi Night', 'https://example.com/photo14.jpg'),
  (15, 5, 'Foodie Adventure', 'https://example.com/photo15.jpg'),
  
  (16, 6, 'Selfie Time', 'https://example.com/photo16.jpg'),
  (17, 6, 'Fun at the Club', 'https://example.com/photo17.jpg'),
  (18, 6, 'Party Moments', 'https://example.com/photo18.jpg'),
  
  (19, 7, 'Mountain Adventure', 'https://example.com/photo19.jpg'),
  (20, 7, 'Road Trip', 'https://example.com/photo20.jpg'),
  (21, 7, 'Nature Trails', 'https://example.com/photo21.jpg'),
  
  (22, 8, 'Lazy Afternoon', 'https://example.com/photo22.jpg'),
  (23, 8, 'Cozy Coffee Shop', 'https://example.com/photo23.jpg'),
  (24, 8, 'Relaxing on the Couch', 'https://example.com/photo24.jpg'),
  
  (25, 9, 'Tasty Treats', 'https://example.com/photo25.jpg'),
  (26, 9, 'Baking Fun', 'https://example.com/photo26.jpg'),
  (27, 9, 'Sweet Creations', 'https://example.com/photo27.jpg'),
  
  (28, 10, 'Friends at the Beach', 'https://example.com/photo28.jpg'),
  (29, 10, 'Laughing Moments', 'https://example.com/photo29.jpg'),
  (30, 10, 'Fun with Pals', 'https://example.com/photo30.jpg');
  `;

  await conDB.promise().query(insertUsers);
  console.log("Initial users inserted");

  await conDB.promise().query(insertPosts);
  console.log("Initial donations inserted");

  await conDB.promise().query(insertComments);
  console.log("Initial apartments inserted");

  await conDB.promise().query(insertTodo);
  console.log("Initial apartments inserted");

  await conDB.promise().query(insertAlbums);
  console.log("Initial apartments inserted");

  await conDB.promise().query(insertPhotos);
  console.log("Initial apartments inserted");
}


initializeDB();
module.exports = initializeDB;
