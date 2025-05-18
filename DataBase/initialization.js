var mysql = require("mysql2");
var path = require("path");
const conDB = require("./connectToDB");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") }); // בדיקת טעינת המשתנים הסביבתיים

async function initializeDB() {
  // הכנסת נתונים התחלתיים לטבלת users
  const insertUsers = `
  INSERT INTO users (name, email) VALUES
  ('Leanne Graham', 'Sincere@april.biz'),
  ('Ervin Howell', 'Shanna@melissa.tv'),
  ('Clementine Bauch', 'Nathan@yesenia.net'),
  ('Patricia Lebsack', 'Julianne.OConner@kory.org'),
  ('Chelsey Dietrich', 'Lucio_Hettinger@annie.ca')
   `;

  const insertPosts =`
  INSERT INTO posts (userId, title, body) VALUES
  (1, "sunt aut facere repellat provident occaecati excepturi optio reprehenderit", "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"),
  (1, "qui est esse", "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"),
  (1, "ea molestias quasi exercitationem repellat qui ipsa sit aut", "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"),
  
  (2, "et ea vero quia laudantium autem", "delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus\naccusamus in eum beatae sit\nvel qui neque voluptates ut commodi qui incidunt\nut animi commodi"),
  (2, "in quibusdam tempore odit est dolorem", "itaque id aut magnam\npraesentium quia et ea odit et ea voluptas et\nsapiente quia nihil amet occaecati quia id voluptatem\nincidunt ea est distinctio odio"),
  (2, "dolorum ut in voluptas mollitia et saepe quo animi", "aut dicta possimus sint mollitia voluptas commodi quo doloremque\niste corrupti reiciendis voluptatem eius rerum\nsit cumque quod eligendi laborum minima\nperferendis recusandae assumenda consectetur porro architecto ipsum ipsam"),
  
  (3, "asperiores ea ipsam voluptatibus modi minima quia sint", "repellat aliquid praesentium dolorem quo\nsed totam minus non itaque\nnihil labore molestiae sunt dolor eveniet hic recusandae veniam\ntempora et tenetur expedita sunt"),
  (3, "dolor sint quo a velit explicabo quia nam", "eos qui et ipsum ipsam suscipit aut\nsed omnis non odio\nexpedita earum mollitia molestiae aut atque rem suscipit\nnam impedit esse"),
  (3, "maxime id vitae nihil numquam", "veritatis unde neque eligendi\nquae quod architecto quo neque vitae\nest illo sit tempora doloremque fugit quod\net et vel beatae sequi ullam sed tenetur perspiciatis"),
  
  (4, "ullam ut quidem id aut vel consequuntur", "debitis eius sed quibusdam non quis consectetur vitae\nimpedit ut qui consequatur sed aut in\nquidem sit nostrum et maiores adipisci atque\nquaerat voluptatem adipisci repudiandae"),
  (4, "doloremque illum aliquid sunt", "deserunt eos nobis asperiores et hic\nest debitis repellat molestiae optio\nnihil ratione ut eos beatae quibusdam distinctio maiores\nearum voluptates et aut adipisci ea maiores voluptas maxime"),
  (4, "qui explicabo molestiae dolorem", "rerum ut et numquam laborum odit est sit\nid qui sint in\nquasi tenetur tempore aperiam et quaerat qui in\nrerum officiis sequi cumque quod"),
  
  (5, "quia et eligendi sed sunt", "sit totam eius qui reiciendis soluta\nsoluta iusto veritatis sunt\nomnis ullam placeat vel minima\nnihil sunt deserunt ullam"),
  (5, "voluptatem doloremque aut mollitia consequatur", "consequuntur vero doloribus molestias\nvoluptatem facere officia et\nsunt adipisci dolores sequi deserunt\nreprehenderit quo rerum sit"),
  (5, "adipisci vel non praesentium", "quae est sint mollitia\nut aut accusantium quae\nrerum itaque minus similique\nsint enim voluptas laborum");
  `;

  const insertComments = `
  INSERT INTO comments (postId, name, email, body) VALUES
  
  (1, "Leanne Graham", "Sincere@april.biz", "This is an amazing post! I really enjoyed reading it."),
  (2, "Ervin Howell", "Shanna@melissa.tv", "I have a few questions about the topic you mentioned. Could you elaborate?"),
  
  (3, "Clementine Bauch", "Nathan@yesenia.net", "Great insights! I'm curious about the second point you raised."),
  (4, "Patricia Lebsack", "Julianne.OConner@kory.org", "I completely agree with your perspective. Keep up the good work!"),
  
  (5, "Chelsey Dietrich", "Lucio_Hettinger@annie.ca", "Very informative post! I'd love to see more content like this."),
  (6, "Leanne Graham", "Sincere@april.biz", "This is an interesting take on the subject. Looking forward to your next post."),
  
  (7, "Ervin Howell", "Shanna@melissa.tv", "I think there are some great points here, but I disagree with the conclusion."),
  (8, "Clementine Bauch", "Nathan@yesenia.net", "This post brings up some thought-provoking ideas. I would like to hear more about this."),
  
  (9, "Patricia Lebsack", "Julianne.OConner@kory.org", "The writing style is excellent, but I think the topic could be explored further."),
  (10, "Chelsey Dietrich", "Lucio_Hettinger@annie.ca", "I enjoyed this post, but I think there could be more examples to support the points."),
  
  (11, "Leanne Graham", "Sincere@april.biz", "Your post is really engaging! I liked the way you broke down the information."),
  (12, "Ervin Howell", "Shanna@melissa.tv", "Interesting read! I would love to know your thoughts on some related topics."),
  
  (13, "Clementine Bauch", "Nathan@yesenia.net", "I found this post very insightful. You've tackled a challenging subject with ease."),
  (14, "Patricia Lebsack", "Julianne.OConner@kory.org", "The examples were very helpful, but I would love to see some case studies."),
  
  (15, "Chelsey Dietrich", "Lucio_Hettinger@annie.ca", "This post was a great introduction to the topic. I learned a lot!"),
  (16, "Leanne Graham", "Sincere@april.biz", "I think you could dive deeper into some of the issues raised in this post.");
  `;

  const insertTodo = `
  INSERT INTO todos (userId, title, completed) VALUES
  
  (1, 'Finish homework', false),
  (1, 'Go for a run', true),
  (1, 'Read a book', false),
  
  (2, 'Buy groceries', true),
  (2, 'Clean the house', false),
  (2, 'Pay bills', true),
  
  (3, 'Write an article', true),
  (3, 'Call mom', false),
  (3, 'Take a walk', true),
  
  (4, 'Prepare a presentation', false),
  (4, 'Attend meeting', true),
  (4, 'Update website', false),
  
  (5, 'Complete project', true),
  (5, 'Go to the gym', false),
  (5, 'Check emails', true);
  `;

  conDB.promise().query(insertUsers);
  console.log("Initial users inserted");

  conDB.promise().query(insertPosts);
  console.log("Initial posts inserted");

  conDB.promise().query(insertComments);
  console.log("Initial comments inserted");

  conDB.promise().query(insertTodo);
  console.log("Initial todos inserted");
}


initializeDB();
module.exports = initializeDB;
