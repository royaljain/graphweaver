rm -rf ./app 
node ../cli/bin init --name=app --backend=sqlite --version=\"local\" 
cd app 
pnpm i --ignore-workspace --no-lockfile
mkdir databases
cp ../databases/database.sqlite databases/database.sqlite 
node ../../cli/bin import sqlite --database=databases/database.sqlite