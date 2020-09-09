from typing import List
from fastapi import FastAPI
from gne import GeneralNewsExtractor, ListPageExtractor
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


class ExtractListTask(BaseModel):
    sample: str = ''
    html: str = ''


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


@app.post('/extract_list')
def extract_list(task: ExtractListTask):
    if not task.sample:
        return {'success': False, 'msg': '全自动智能提取即将上线，敬请期待。现在请填写列表中任一一项的标题或者 XPath。'}
    if not task.html:
        return {'success': False, 'msg': '请填写 HTML'}
    extractor = ListPageExtractor()
    try:
        result = extractor.extract(task.html, task.sample)
    except Exception as e:
        result = {'success': False, 'msg': str(e)}
    return result
