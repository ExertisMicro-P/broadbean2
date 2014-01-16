/**
 * @author Exertis Micro-P
 */
if (Jobs.find().count() === 0) {
  Jobs.insert({
    title: 'Introducing Telescope',
    author: 'Sacha Greif',
    url: 'http://sachagreif.com/introducing-telescope/'
  });

  Jobs.insert({
    title: 'Meteor',
    author: 'Tom Coleman',
    url: 'http://meteor.com'
  });

  Jobs.insert({
    title: 'The Meteor Book',
    author: 'Tom Coleman',
    url: 'http://themeteorbook.com'
  });
}