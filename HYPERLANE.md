# Hyperlane Relayer template

Note that I have deployed on **fhenixtestnet**, **arbitrumsepolia** and **chilizspicy**. To deploy on your chain, reach out to me and I will add it to the registry.

## Set env

1. Run this command before running relayer and sending test message.

`export HYP_KEY=set_your_private_key_here`

## Run relayer

1. Open new terminal
2. Run Set env
3. Set the chains you need to listen to.
4. Run command below

`hyperlane relayer --chains fhenixtestnet,arbitrumsepolia,chilizspicy --registry https://github.com/gabrielantonyxaviour/clash-of-balls`

## Test send message

1. Open new terminal
2. Run Set env
3. Set the origin and destination
4. Run command below

`hyperlane send message --origin fhenixtestnet --destination chilizspicy --registry https://github.com/gabrielantonyxaviour/clash-of-balls`
