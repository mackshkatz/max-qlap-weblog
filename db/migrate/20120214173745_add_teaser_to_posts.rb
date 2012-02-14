class AddTeaserToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :teaser, :text
  end
end
