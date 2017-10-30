Template.amis.helpers({
    amis: function() {
    var userId = Meteor.userId();
    return Friends.find({"from_id": userId});
  },

  amis1: function() {
    var userId = Meteor.userId();
    return Friends.find({"to_id": userId});
  },

   id: function() {
   	var userId = Meteor.userId();
   	if(this.from_id == userId){ var id = this.to_id}else{var id = this.from_id}
    return id;
  },

  name: function() {
   	var userId = Meteor.userId();
   	if(this.from_id == userId){ var name = this.name_to_id}else{var name = this.name_from_id.username}
    return name;
  },

  gender_fille: function() {
    var userId = Meteor.userId();
    if(this.from_id == userId){ var id = this.to_id}else{var id = this.from_id}
    var user = Meteor.users.findOne(id);
    var gender = user.profile.gender;
    if (gender =='fille') {
      return true;
    } else {
      return false;
    }
  },

  gender_garcon: function() {
    var userId = Meteor.userId();
    if(this.from_id == userId){ var id = this.to_id}else{var id = this.from_id}
    var user = Meteor.users.findOne(id);
    var gender = user.profile.gender;
    if (gender =='garcon') {
      return true;
    } else {
      return false;
    }
  },

  presentation: function() {
    var userId = Meteor.userId();
    if(this.from_id == userId){ var id = this.to_id}else{var id = this.from_id}
    var user = Meteor.users.findOne(id);
    var presentation = user.profile.presentation;
      return presentation;
  }


});

Template.amis.events({
    'touchstart .supprimer_ami': function(e) {
    e.preventDefault();
    Friends.remove(this._id);
    },

     'touchstart .profil_ami': function(e) {
    e.preventDefault();
      var userId = Meteor.userId();
     if(this.from_id == userId){ var id = this.to_id}else{var id = this.from_id}
     Router.go('messagerie', {post_author: id});
    }





});