import json
import sys
import os
from dotenv import load_dotenv

from openai import OpenAI
from typing_extensions import override

from handlers.genghis_event_handler import GenghisKhanEventHandler
from persona.genghis_persona import PERSONA_NAME, PERSONA_STYLE, DISCLAIMER, get_genghis_introduction
from prompts.instructions import SYSTEM_INSTRUCTIONS
from logic.resource_filter import filter_resources

# Load environment variables from .env
load_dotenv()

# Get OpenAI API Key from environment
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

def load_resources(file_path: str):
    with open(file_path, 'r') as file:
        return json.load(file)

def main():
    """
    Main entry point for the Genghis Khan AI application.
    Loads resources, sets up the OpenAI client, and starts an interactive conversation loop.
    """

    # Load the resources from JSON
    resources = load_resources("data/resources.json")

    # Initialize OpenAI client
    client = OpenAI(api_key=OPENAI_API_KEY)

    # Combine persona instructions, disclaimers, and system instructions
    combined_instructions = f"""{PERSONA_STYLE}

{DISCLAIMER}

{SYSTEM_INSTRUCTIONS}
"""

    # Create the Assistant with the combined instructions
    assistant = client.beta.assistants.create(
        name=f"{PERSONA_NAME} Helper",
        instructions=combined_instructions,
        model="gpt-4o",
    )

    # Start a new conversation thread
    thread = client.beta.threads.create()

    # Provide an initial "Genghis" style greeting
    greeting = get_genghis_introduction()
    print(f"{greeting}\nType 'exit' to quit.")

    while True:
        user_input = input("\nYou: ").strip()
        if user_input.lower() in ["exit", "quit"]:
            print(f"{PERSONA_NAME}: Farewell, noble learner. Until we ride again!")
            break

        # Create the user message
        client.beta.threads.messages.create(
            thread_id=thread.id,
            role="user",
            content=user_input
        )

        # Stream the assistant's response
        with client.beta.threads.runs.stream(
            thread_id=thread.id,
            assistant_id=assistant.id,
            instructions="Please address the user as a noble learner.",
            event_handler=GenghisKhanEventHandler()
        ) as stream:
            stream.until_done()

if __name__ == "__main__":
    main()
