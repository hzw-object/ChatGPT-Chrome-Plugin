import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from 'openai';
import { getProviderConfigs } from '../utils/config';
// const BASE_URL = 'https://api.openai.com/v1/engines/davinci-codex/completions';
// const BASE_URL = 'https://api.openai.com/v1/engines/davinci-002/completions';

async function fetchChatAPI(messages: ChatCompletionRequestMessage[]) {
  const { provider, configs } = await getProviderConfigs();

  const apiKey = configs[provider].apiKey;
  const model = configs[provider].model;

  const configuration = new Configuration({
    apiKey: apiKey,
  });
  const openai = new OpenAIApi(configuration);
  return openai.createChatCompletion({
    model: model,
    messages: messages,
  });
}

export { fetchChatAPI };
