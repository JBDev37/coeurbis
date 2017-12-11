Template.avertissement.helpers({

	count_0:function() {
	var count = Avertissement.find({user_id:this._id}).count();
	if (count == 0){ return true}
  },

	count_1:function() {
	var count = Avertissement.find({user_id:this._id}).count();
	if (count == 1){ return true}
  },

	count_2:function() {
	var count = Avertissement.find({user_id:this._id}).count();
	if (count == 2){ return true}
  },

 count_avertissement:function() {
  var current_id = Router.current().params.post_author;
  return Avertissement.find({user_id:current_id}).count();
  },

    visite_profil:function() {
  var current_id = Router.current().params.post_author;
  var userId = Meteor.userId();
  if(current_id!==userId){
   return "visite-profil"
  }else{
  }
  
  },

});