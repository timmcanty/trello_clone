TrelloClone.Collections.Boards = Backbone.Collection.extend({
  url: '/api/boards',
  model: TrelloClone.Models.Board,

  getOrFetch: function (id) {
    if (this.get(id)) {
      this.get(id).fetch();
      return this.get(id);
    }
    var board = new TrelloClone.Models.Board({id: id});

    board.fetch( {
      success: function () {
        this.add(board);
      }.bind(this)
    });
    return board;
  }
})
