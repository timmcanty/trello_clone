window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $('#main');

    TrelloClone.boards = new TrelloClone.Collections.Boards();


    new TrelloClone.Routers.BoardRouter($rootEl);
    Backbone.history.start();
  }
};
