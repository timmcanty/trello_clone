# write some jbuilder to return some json about a board
# it should include the board
#  - its lists
#    - the cards for each list


json.extract! @board, :id, :title

json.lists @board.lists do |list|

    json.board_id list.board_id
    json.title list.title
    json.ord list.ord
    json.id list.id

    json.cards list.cards, :id, :title, :list_id, :description, :ord
end
