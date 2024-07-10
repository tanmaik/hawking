# Hawking.

[developed by tanmai](https://github.com/tanmaik)
[designed by johanna](https://github.com/johannalohmus)
[developed & written by suraj](https://github.com/surajvaddi)

## Inspiration

“The nerves that controlled his muscles were failing and he became trapped in his body, but his mind was still free.” BBC reporter James Gallagher evokes the lack of emphasis on untapped scientists due to a lack of equitable education opportunities. At least **one in five children in the U.S.** have learning and thinking differences such as ADHD or dyslexia, amounting to over **four million children** younger than eighteen. We hope to level the playing field so that brilliant minds such as Professor Stephen Hawking’s do not go unrealized.

## What it does

Hawking is a web app that integrates elegant summaries of dense text with real-time recall exercises that align with current methods of catering learning materials to students with learning disabilities.

One. Tell us a little about yourself, how you learn, and how you’d like Hawking to assist you. Two. Upload information, whether images of textbook chapters or text files of information. Three. Absorb the information, now simplified and available at your fingertips.

We configure text and image generation to breathe life into stale content using generative artificial intelligence such as Chat-GPT and DALL•E to create summaries based on uploaded information. These methods allow us to put a creative twist on content using analogies, synthesis questions, and active recall questions. Past summaries are associated with a user’s account and are available for future access.

## How we built it

Our software has three main facets: frontend, backend, and artificial intelligence. We aimed for a simplistic, appealing user experience. To guide this process, we used Figma to brainstorm layouts and information flow as users navigate Hawking. Our frontend is powered by Next.js, a wrap-around for React Native and a combination of HTML and CSS for our landing page. To integrate Chat-GPT (text generation) and DALL•E (icon generation), we utilized OpenAI’s API. For image to text conversion, we implemented the Tesseract API, and we integrated both of APIs under a single React component for file uploads.

We built the backend using a very popular Node.js framework: Express. Our server is modeled after a REST API, where our React frontend targets routes on the server to retrieve data from the database. This also gives us protection against cyber-attacks, without having to directly fetch data from our MongoDB document-less database.

## Challenges we ran into

We don’t want our users to be bogged down by delays due to API requests, so one of our priorities was to correctly integrate asynchronous functions and _await_ in JavaScript. Implementing this functionality also made it challenging to implement file input/output streams. To solve these issues simultaneously, we restructured the return values of our functions using _await_ again, and we utilize a main method to integrate these return values.

Additionally, the creativity that generative artificial intelligence brings also makes it difficult to standardize. This is especially challenging when designing an algorithm that uses language processing of AI-generated text. To accommodate this, we dynamically sized our summaries and flashcards to consolidate information into digestible chunks.

Each person has such an individualized approach to learning, and we wanted to remain conscious of these natural differences. To address this, we spent a significant portion of our planning stage devising implementable solutions that would benefit as many learners as possible.

## Accomplishments that we're proud of

One of our biggest accomplishments was expanding from operating solely on text files to further incorporating .jpg, .png, and .jpeg files to our ensemble of accepted files. We found this feature to be critical for content that is not directly available as selectable text, such as textbook pages or online .pdf files. To fill this gap, we researched and implemented the tesseract API, which supports optical character recognition (OCR). We’re excited that Hawking can synthesize a variety of formats, and we look forward to integrating even more in the future.

## What's next for Hawking

Our mission is to expand our media generation routes to reach all learners. In particular, we aim to push these boundaries by including audio input and output features as well. This would be incredibly useful to learners who have trouble reading or are visually impaired. Furthermore, it would broaden information input sources to also encompass lectures, podcasts, and more. Stay tuned to enjoy these features!
