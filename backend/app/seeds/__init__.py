from flask.cli import AppGroup
from .users import seed_users, undo_users
from .tags import seed_tags, undo_tags, seed_tag_categories, undo_tag_categories
from .attributes import seed_industries, seed_role_categories, seed_roles, undo_industries, undo_role_categories, undo_roles

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_role_categories()
    seed_tag_categories()
    seed_roles()
    seed_tags()
    seed_industries()
    seed_users()
# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_industries()
    undo_users()
    undo_tags()
    undo_roles()
    undo_role_categories()
    undo_tag_categories()
