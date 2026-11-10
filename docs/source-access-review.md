# Source access review

All 46 requested sources are retained in the directory. Only the sources configured in `config/sources.json` run on the recurring collection schedule. Terms and robots findings are point-in-time checks, not legal permission or proof a competition is open.

| Source | Mode | Listing page verified | Access note |
| --- | --- | --- | --- |
| [ASLA](https://www.asla.org/resources/practitioners/rfqs-and-opportunities) | automatic | Yes | Public-page parser restored at user request for titles, links, location and stated deadlines only. Descriptions and images excluded. Reuse permission remains unverified; robots restrictions are enforced. |
| [Landezine](https://landezine.com/topics/methods-mediations/calls-opportunities/) | automatic | Yes | Metadata-only public listing-page parser restored at user request. Current robots permits this page but blocks RSS, so no feed URLs are requested. Reuse permission remains unverified; descriptions and images excluded. |
| [Bustler](https://bustler.net/competitions/) | manual-review | No | Robots could not be verified; no unattended collection enabled. |
| [ArchDaily Competitions](https://www.archdaily.com/search/competitions/en) | permission-needed | Yes | Terms require written permission for copying or scraping. Not collected. |
| [competitionline](https://www.competitionline.com/) | manual-review | No | Homepage checked; active opportunity page, terms and collection adapter remain unverified. |
| [Archinect](https://archinect.com/competitions) | manual-review | Yes | Competition listing verified; promoted listings link to Bustler. Automated-access and republication terms need review. |
| [Competitions.archi](https://competitions.archi/cat/all-competitions/) | automatic | Yes | Publisher-advertised RSS verified. Only titles, linked URLs and factual metadata are indexed; result announcements excluded. No blanket republication permission inferred. |
| [World Architecture Community](https://www.worldarchitecture.org/) | manual-review | No | Homepage checked; active opportunity page, terms and collection adapter remain unverified. |
| [Deziko](https://www.deziko.com/) | manual-review | Yes | Competition listing with organizer links found on homepage. No automated-access or reuse permission verified; not enabled. |
| [TerraViva Competitions](https://www.terravivacompetitions.com/open-competitions/) | permission-needed | Yes | Official open-competition page verified. Website terms restrict unauthorized copying and publication; direct imports await permission. |
| [Europan Europe](https://www.europan-europe.eu/) | manual-review | No | Homepage checked; active opportunity page, terms and collection adapter remain unverified. |
| [Buildner](https://architecturecompetitions.com/) | permission-needed | Yes | Terms prohibit unauthorized automated access and retrieval. Not collected; organizer links may be provided by permitted third-party metadata. |
| [Young Architects Competitions (YAC)](https://www.youngarchitectscompetitions.com/open-competitions) | manual-review | Yes | Official open-competitions page verified. Individual brief and access/reuse terms need review before automation. |
| [Archstorming](https://www.archstorming.com/competitions.html) | permission-needed | Yes | Official competition page verified. Terms restrict reproduction and public communication of content without written consent. |
| [Non Architecture](https://www.nonarchitecture.eu/) | manual-review | No | Publisher RSS reachable but sampled entries include newsletters and completed projects. A current-competition filter, terms review and adapter are required. |
| [Arch Out Loud](https://www.archoutloud.com/competitions.html) | permission-needed | No | Competition page linked from official homepage; terms restrict copying and redistribution. Current openings not verified. |
| [UNI](https://uni.xyz/) | manual-review | No | Homepage checked; active opportunity page, terms and collection adapter remain unverified. |
| [Arquideas](https://www.arquideas.net/) | unverified | No | Current site did not expose a verifiable design-competition listing. Automated access requires permission under retrieved terms. Do not treat as an active organizer. |
| [International Garden Festival / Reford Gardens](https://www.jardinsdemetis.com/) | manual-review | No | Official homepage and advertised feed reachable, but feed provides no current opportunity items. Locate and verify the organizer call page before collection. |
| [Chaumont-sur-Loire International Garden Festival](https://concours.domaine-chaumont.fr/en/international-garden-festival/contest-home-page) | permission-needed | Yes | Official festival competition portal verified. Legal notice restricts extraction and reproduction without authorization; link only. |
| [Royal Horticultural Society (RHS)](https://www.rhs.org.uk/shows-events/exhibit-at-a-show/garden-applications) | link-review | No | Supplied garden-applications URL returned HTTP 404 in direct audit. Search index still references it; verify the current official route manually before collection. |
| [CaFÉ](https://www.callforentry.org/public-art/) | manual-review | No | Homepage checked; active opportunity page, terms and collection adapter remain unverified. |
| [CODAworx](https://www.codaworx.com/) | access-blocked | No | Robots rules disallow the supplied path for this collector. No bypass attempted. |
| [Artwork Archive](https://www.artworkarchive.com/call-for-entry) | access-blocked | No | Official listing endpoint returned HTTP 403. No bypass attempted. |
| [Creative Capital](https://creative-capital.org/creative-capital-award/) | permission-needed | No | Official awards page linked from homepage. Terms prohibit automated programs and scripts; no collection enabled. |
| [New York Foundation for the Arts (NYFA)](https://www.nyfa.org/) | access-blocked | No | Direct access returned HTTP 403. An active opportunity page and permitted integration remain unverified. |
| [SAM.gov](https://sam.gov/opportunities) | key-required | Yes | Official opportunities API documented; a SAM.gov API key is required. No key configured and no browser scraping fallback. |
| [NYC PASSPort](https://www.nyc.gov/site/mocs/passport/articles/find-opportunities.page) | manual-review | No | Robots could not be verified; no unattended collection enabled. |
| [NYS Contract Reporter](https://www.nyscr.ny.gov/Ads/Search) | manual-review | No | Search route discovered on official homepage. Registration requirements, permitted automation and design filters need review. |
| [NJ Division of Purchase and Property](https://www.nj.gov/treasury/purchase/) | manual-review | Yes | Official page links current bids to NJSTART. Tender details need a dedicated NJSTART access and adapter review; no generic homepage scraping enabled. |
| [BidNet Direct](https://www.bidnetdirect.com/) | manual-review | No | Homepage checked; active opportunity page, terms and collection adapter remain unverified. |
| [DemandStar](https://www.demandstar.com/) | permission-needed | No | Terms prohibit robots, scraping and extraction tools for monitoring or copying pages. Use an authorized integration or manual portal. |
| [EU TED](https://ted.europa.eu/en/) | automatic | Yes | Official keyless Search API tested. Latest 100 urban-planning/landscape CPV matches; partial coverage is disclosed. ACTIVE scope is not an eligibility assertion. |
| [MERX](https://www.merx.com/public/solicitations/open) | manual-review | No | Public solicitation route discovered on official homepage. Terms, account access and extraction method need review. |
| [Van Alen Institute](https://www.vanalen.org/) | manual-review | No | Homepage checked; active opportunity page, terms and collection adapter remain unverified. |
| [Design Trust for Public Space](https://www.designtrust.org/rfp/) | manual-review | No | RFP route discovered from official homepage. Current cycle, application window and collection terms not verified. |
| [Project for Public Spaces](https://www.pps.org/community-placemaking-grants) | manual-review | Yes | Official community placemaking grants page verified. A specific open cycle and permitted collection method still need review. |
| [Graham Foundation](https://www.grahamfoundation.org/grant_programs/) | manual-review | Yes | Official grant programs and application guidance verified. Do not infer a currently open cycle from this evergreen page. |
| [Dumbarton Oaks](https://www.doaks.org/) | manual-review | No | Robots could not be verified; no unattended collection enabled. |
| [Harvard Graduate School of Design](https://www.gsd.harvard.edu/funding-opportunities/) | manual-review | Yes | Official funding page verified. Many programs are student- or affiliation-specific; no eligibility or open status inferred. |
| [Penn Weitzman School of Design](https://www.design.upenn.edu/resources/competitions) | manual-review | Yes | Official competitions resource verified through web retrieval; direct robots check failed. No unattended collection enabled. |
| [Architectural Association](https://www.aaschool.ac.uk/) | manual-review | No | Homepage checked; active opportunity page, terms and collection adapter remain unverified. |
| [International Federation of Landscape Architects (IFLA)](https://www.iflaworld.com/competitions) | manual-review | No | Official competition route found. Advertised RSS currently has no items; it is not evidence of an active opportunity. |
| [Royal Institute of British Architects (RIBA)](https://www.riba.org/explore/competitions/) | manual-review | Yes | Official competitions page verified. Site terms and an adapter for individual briefs still need review. |
| [American Institute of Architects (AIA)](https://www.aia.org/design-excellence/awards) | manual-review | Yes | Official awards directory verified. Submission windows and membership/licensure requirements vary; no blanket open status inferred. |
| [International Society of City and Regional Planners (ISOCARP)](https://isocarp.org/activities/awards/) | manual-review | No | Official awards route found. Advertised feed contains historical items; not enabled as a current-opportunity feed. |

## Canonical URLs and duplicates

Use an explicit single organizer URL from publisher metadata when available; keep the listing URL and all source provenance. Merge matching normalized canonical URLs. Do not merge similar titles automatically, since annual editions and similarly named competitions may be distinct. An organizer link is not an assertion of permission to fetch that organizer site.

## Missing fields

Unknown participation, eligibility, fee and budget stay unverified/null. Preserve raw deadline evidence. Distinct lot deadlines are not reduced to one guessed cutoff. Publication date is not a deadline.

## Coverage

TED is a bounded discovery query for the latest 100 matching notices, including secondary CPV classifications. The feed is the publisher’s latest entries. Neither is exhaustive. ASLA metadata collection was restored at user request. Landezine metadata collection uses its robots-allowed public listing page; blocked RSS paths are not requested. Reuse permissions remain unverified; no descriptions or images are republished.
