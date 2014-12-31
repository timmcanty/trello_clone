TrelloClone.Collections.Lists = Backbone.Collection.extend({

  initialize: function (model , options) {
    this.board = options.board;
    this.comparator = 'ord'
  },


  url: function () { return '/api/boards/' + this.board.id + '/lists'; },
  model: TrelloClone.Models.List
})
