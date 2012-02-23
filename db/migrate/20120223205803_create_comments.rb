class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.text :body
      t.string :email
      t.integer :post_id

      t.timestamps
    end
  end
end
