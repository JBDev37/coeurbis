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
  }

});

Template.amis.events({
    'click .supprimer_ami': function(e) {
    e.preventDefault();
    Friends.remove(this._id);
    }


});