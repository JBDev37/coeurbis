if (Posts.find().count() === 0) {
  Posts.insert({
    _id: "1",
    title: 'Introducing Telescope',
    url: 'http://sachagreif.com/introducing-telescope/'
  });

  Posts.insert({
     _id: "2",
    title: 'Meteor',
    url: 'http://meteor.com'
  });

  Posts.insert({
     _id: "3",
    title: 'The Meteor Book',
    url: 'http://themeteorbook.com'
  });
}

