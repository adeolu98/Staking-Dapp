staking pool functions
staking 

1 = calculate contract token balance of token to be staked in contract (initial balance)
2 = accept stake token  deposits for msg.sender
3 = calculate stake token  balance in contract (balance after send)
4 = get the difference between initial balance and balance after send and put in a variable
5 = mint lp tokens to msg,sender which is evidence of staked tokens by msg.sender. it will be used to claim the staked tokens too
6 = get the lp token balance of the msg.sender ands use to calculate possible reward 


payouts

7 = calculate lp token balnce of contract
8 = accept lp token deposits from the msg.sender 
9 = calculate lp token balance of contract after lp token deposits
10 = substract 9 from 7
11 = make sure the difference in 7 and 9 is same as lp token balance of msg.sender as in variable in command 6
12 = if the same use the difference in lp token balance of contract before and after send ( as in 10) to calculate rewards 

13 = pay out reward token as reward for staking depending on time staked 