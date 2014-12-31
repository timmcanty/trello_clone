TrelloClone.Models.List = Backbone.Model.extend({

  initialize: function (options) {
    this.board = options.board;
  },
  urlRoot: function () { return '/api/boards/' + this.board.id + '/lists'; },

  cards: function () {
    if (this._cards) return this._cards;
    this._cards = new TrelloClone.Collections.Cards( [], { list: this});
    return this._cards;
  },

  parse: function (response) {
    if (response.cards) {
      this.cards().set(response.cards, { parse: true});
      this.cards().each( function(card) {
        card.list = this;
      }.bind(this));
      delete response.cards;
    }

    return response;
  },



})
