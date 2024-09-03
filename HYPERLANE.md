Set env

`export HYP_KEY=set_your_private_key_here`

Run relayer

`hyperlane relayer --chains fhenixtestnet,arbitrumsepolia,chilizspicy --registry https://github.com/gabrielantonyxaviour/clash-of-balls`

Test send message

`hyperlane send message --origin fhenixtestnet --destination chilizspicy --registry https://github.com/gabrielantonyxaviour/clash-of-balls --verbosity trace`
