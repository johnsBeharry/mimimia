### Unique Private Content Sale+Transfer

*Allow users to sell a unique piece of content (image, data, music) to another user through a Status app...*

```gherkin
Feature: User Interface
  Browser

#perfect world cases
Scenario: Create listing on the marketplace
  Given I have an image "my-unique-digital-art.jpg"
  When I press "Create Listing"
  And I fill name as "Beyonce's Baby"
  Then

Scenario: Make a purchase
  ...
  Given I
```

###### Technologies

- NFT?
  - Acts as the database of content hashes
- Status Chat App/Bot `(sponsor)`
  - Interface to facilitate the trade?
- IPFS
  - Storage; Upload encryped data
- dAppNode / Embark / POA Network
  - Development Kit / Server ?
- DAI `(optional)` `(sponsor)`
  - For stable prices
- Universal Login
  - User accounts -- ?

###### Business Model

- 

###### Problems

1. **Griefing problem** -- how to verify that the private key of the buyer actually can decrpyt the data?
2. Purchaser can lie about the contents not being received
3. Seller can lie about the contents that were sent

###### Possible Solutions

1. Hash the file, and create some kind of onion layering
