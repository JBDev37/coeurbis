Template.avertissement_mobile.helpers({

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

});

Template.avertissement_mobile.events({

  'click .retour': function(e) {
     window.history.back();
   }
});