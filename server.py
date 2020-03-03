from typing import List
from fastapi import FastAPI
from gne import GeneralNewsExtractor
from pydantic import BaseModel


app = FastAPI()


class ExtractTask(BaseModel):
    html: str
    title_xpath: str = ''
    publish_time_xpath: str = ''
    author_xpath: str = ''
    noise_node_list: List[str] = []
    host: str = ''
    with_body_html: bool = False


@app.get('/')
def index():
    return {'success': True}


@app.post('/extract')
def extract(task: ExtractTask):
    extractor = GeneralNewsExtractor()
    try:
        result = extractor.extract(
            task.html,
            title_xpath= task.title_xpath,
            author_xpath=task.author_xpath,
            publish_time_xpath=task.publish_time_xpath,
            with_body_html=task.with_body_html,
            host=task.host,
            noise_node_list=task.noise_node_list
        )
    except Exception as e:
        result = {'success': False, 'msg': str(e)}
    return result
